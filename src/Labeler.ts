import chalk from 'chalk';
import crypto from 'crypto';
import queue from 'queue';
import stringFomat from 'string-format';
import winston, { format } from 'winston';

import { IApiProviderClient, Milestone, PullRequest } from './ApiProviders';
import { Cache } from './Cache';
import { CacheableAction } from './CacheableAction';
import {
  IAction,
  IActionCollection,
  IActionExecutor,
  IBufferable,
  ICache,
  IConfig,
  ILabeler,
  ILogger,
  IUpdaterActionsLogger,
} from './Interfaces';
import { LabelerContext } from './LabelerContext';
import { Logger } from './Logger';
import { LabelerOptions } from './Types';

enum PullRequestCacheState {
  AwaitingFix = 1,
  Fixed = 2,
  NoChanges = 3,
}

export class Labeler implements ILabeler {

  private readonly _options: LabelerOptions;

  private readonly _client: IApiProviderClient;

  private readonly _actions: Array<IActionExecutor<IAction>>;

  private readonly _milestones: CacheableAction<Array<Milestone>>;

  private readonly _cache: ICache;

  constructor(
    config: IConfig | IActionCollection,
    apiProviderClient: IApiProviderClient,
    options?: LabelerOptions,
  ) {
    this.createLogger = this.createLogger.bind(this);
    this.test = this.test.bind(this);
    this.fix = this.fix.bind(this);
    this.processPullRequests = this.processPullRequests.bind(this);
    this.createUpdateTasks = this.createUpdateTasks.bind(this);

    const cacheOptions = Object.assign(
      {},
      {
        path: './.cache.json',
      } as LabelerOptions['cache'],
      options?.cache
    );

    this._options = Object.assign(
      {},
      {
        limit: 100,
        threads: 3,
      } as LabelerOptions,
      {
        ...options,
        cache: cacheOptions,
      }
    );

    this._client = apiProviderClient;
    this._actions = (config as IActionCollection).actions;
    this._cache = new Cache(this._options.cache.path);

    // TODO: Something went wrong. This code shouldn't be here.
    // Need to figure out how to fix this.
    this._milestones = new CacheableAction(
      (): Promise<Array<Milestone>> => apiProviderClient.getMilestones()
    );
  }

  public test(): Promise<void> {
    try {
      return this.processPullRequests(true);
    } catch(error) {
      const logger = this.createLogger();
      logger.error(
        '{class}.{method}: an error occurred during processing: {error.message}',
        {
          class: this.constructor.name,
          method: this.test.name,
          error: error instanceof Error
            && {
              name: error.name,
              message: error.message,
              stack: error.stack
            }
            || error,
        }
      );
      logger.flush();
      throw error;
    }
  }

  public fix(): Promise<void> {
    try {
      return this.processPullRequests();
    } catch(error) {
      const logger = this.createLogger();
      logger.error(
        '{class}.{method}: an error occurred during processing: {error.message}',
        {
          class: this.constructor.name,
          method: this.test.name,
          error: error instanceof Error
            && {
              name: error.name,
              message: error.message,
              stack: error.stack
            }
            || error,
        }
      );
      logger.flush();
      throw error;
    }
  }

  private async processPullRequests(test?: boolean): Promise<void> {
    const logger = this.createLogger();
    const cache = this._cache;

    const {
      threads,
      rateLimitNotify,
      test: allowedToHandle,
      cache: cacheOptions,
    } = this._options;

    const q = queue({
      autostart: false,
      concurrency: threads,
    });

    logger.info(
      'Processing pull requests for {repo} using {owner} token in {mode} mode.',
      {
        repo: chalk.yellow(this._client.repo),
        owner: chalk.yellow(this._client.owner),
        mode: chalk.yellow(test ? 'test' : 'fix'),
      }
    );

    logger.flush();

    if (cacheOptions.ttl) {
      await cache.load();

      // compare hash
      const hash = crypto
        .createHash('sha256')
        .update(JSON.stringify(cacheOptions))
        .digest('base64');

      if (cache.get('hash') !== hash) {
        cache.clearAll();
        cache.add('hash', hash, 30 * 24 * 60 * 60);
      }
    }

    if (rateLimitNotify) {
      const rateLimit = await this._client.getRateLimit();

      if (rateLimit.used > rateLimitNotify) {
        logger.warning(
          'Request exceeded notification: used {used} of {limit} requests.',
          rateLimit,
        );
        logger.flush();
      }
    }

    const limit = (this._options.limit > 100) ? 100 : this._options.limit;
    const totalPages = (this._options.limit > 100)
      ? Math.ceil(this._options.limit / 100)
      : 1;

    let page = 1;

    while (page <= totalPages) {
      const pullRequests = await this._client.getPullRequests(
        page,
        limit
      );

      if (!pullRequests.length) {
        break;
      }

      const logSkipped = (pullRequest: PullRequest, reason: string): void => {
        logger.info(
          'Pull Request #{code} from {sourceBranch.name} into {targetBranch.name} by {author.login}',
          {
            code: pullRequest.code,
            sourceBranch: {
              name: pullRequest.sourceBranch.name,
            },
            targetBranch: {
              name: pullRequest.targetBranch.name,
            },
            author: pullRequest.author
              && {
                login: pullRequest.author.login,
              },
          }
        );
        logger.info(`skipped: ${reason}`);
        logger.flush();
      };

      for (const pullRequest of pullRequests) {
        if (allowedToHandle && !allowedToHandle(pullRequest)) {
          logSkipped(pullRequest, 'labeler options');
          continue;
        }

        const cacheKey = `pr-${pullRequest.code}`;
        const cacheValue = cache.get<PullRequestCacheState>(cacheKey);

        if (
          (test && cacheValue)
          || (
            !test
            && [
              PullRequestCacheState.Fixed,
              PullRequestCacheState.NoChanges
            ].includes(cacheValue)
          )
        ) {
          logSkipped(
            pullRequest,
            `cached until ${new Date(cache.getTtl(cacheKey))}`
          );
          continue;
        }

        const context = new LabelerContext({
          apiProviderClient: this._client,
          logger: this.createLogger(),
          pullRequest,
          cache,
          test,
        });

        q.push(
          async(): Promise<void> => {
            context.logger.info(
              'Pull Request #{code} from {sourceBranch.name} into {targetBranch.name} by {author.login}',
              {
                code: pullRequest.code,
                sourceBranch: {
                  name: pullRequest.sourceBranch.name,
                },
                targetBranch: {
                  name: pullRequest.targetBranch.name,
                },
                author: pullRequest.author
                  && {
                    login: pullRequest.author.login,
                  },
              }
            );

            context.logger.info(context.pullRequest.htmlUrl);

            for (let i = 0, ic = this._actions.length; i < ic; ++i) {
              const action = this._actions[i];

              if (action.linked && !action.linked.executed) {
                continue;
              }

              try {
                await action.execute(context);
              } catch (error) {
                context.logger.error(
                  'an error occurred while executing an action {index} of {total}: {error.message}',
                  {
                    index: i + 1,
                    total: ic,
                    error: error instanceof Error
                      && {
                        name: error.name,
                        message: error.message,
                        stack: error.stack
                      }
                      || error,
                    pullRequest,
                    action: {
                      class: action.constructor.name,
                      executed: action.executed,
                    },
                  }
                );
                (context.logger as unknown as IBufferable).flush();
                throw error;
              }

              if (context.stopped) {
                context.logger.info(
                  'actions check stopped on {index} of {total}; comment: {comment}',
                  {
                    index: i + 1,
                    total: ic,
                    comment: context.stopComments || '<empty>',
                    pullRequest: {
                      code: pullRequest.code,
                    },
                  }
                );
                break;
              }
            }

            const updateTasks = await this.createUpdateTasks(context);

            if (!test && updateTasks.length) {
              try {
                await Promise.all(
                  updateTasks.map(update => update())
                );
              } catch (error) {
                context.logger.error(
                  'an error occurred while executing update tasks: {error.message}',
                  {
                    pullRequest,
                    updater: context.updater,
                    error: error instanceof Error
                      && {
                        name: error.name,
                        message: error.message,
                        stack: error.stack
                      }
                      || error,
                  }
                );
                (context.logger as unknown as IBufferable).flush();
                throw error;
              }

              cacheOptions.ttl
                && cache.add<PullRequestCacheState>(
                  cacheKey,
                  PullRequestCacheState.Fixed,
                  cacheOptions.ttl
                );
            } else {
              cacheOptions.ttl
                && cache.add<PullRequestCacheState>(
                  cacheKey,
                  updateTasks.length || context.fixable
                    ? PullRequestCacheState.AwaitingFix
                    : PullRequestCacheState.NoChanges,
                  cacheOptions.ttl
                );
            }

            (context.logger as unknown as IBufferable).flush();
          }
        );
      }

      ++page;
    }

    await new Promise<void>((resolve): void => {
      q.emit = (e: string | symbol, ...args: Array<any>): boolean => {
        if (e === 'end') {
          resolve();
        }

        if (e === 'error') {
          logger.error(
            'unhandled exception',
            {
              error: args?.[0] instanceof Error
                && {
                  name: args[0].name,
                  message: args[0].message,
                  stack: args[0].stack
                }
                || args,
            }
          );
          logger.flush();
        }

        return true;
      };

      q.start();
    });

    if (cacheOptions.ttl) {
      cache.save();
    }
  }

  private async createUpdateTasks(context: LabelerContext): Promise<Array<{ (): Promise<any> }>> {
    const {
      pullRequest,
      updater,
    } = context;

    const logger = context.logger as ILogger & IUpdaterActionsLogger;

    try {
      const {
        deleteBranch,
        addCommentToPullRequest,
        removeRequestedReviewers,
        requestReviewers,
        updatePullRequestLabels,
        updatePullRequestMilestone,
        updatePullRequestTitile,
        updatePullRequestDescription,
      } = this._client;

      if (updater.tasks.length) {
        for (const task of updater.tasks) {
          // TODO: Remove in future releases
          context['githubClient'] = this._client;
          context['labelerContext'] = context;
          // --

          await task(context);
        }
      }

      const updateTasks = new Array<{ (): Promise<any> }>();
      const labels = new Set<string>(pullRequest.labels);

      if (updater.addLabels.size) {
        updater.addLabels.forEach(labels.add, labels);
      }

      if (updater.removeLabels.size) {
        updater.removeLabels.forEach(labels.delete, labels);
      }

      if (Array.from(labels).sort().join() !== pullRequest.labels.sort().join()) {
        logger.action(
          'fix labels: {current} => {new}',
          {
            current: chalk.yellow(pullRequest.labels.length ? pullRequest.labels.join(', ') : '<empty>'),
            new: chalk.green(labels.size ? Array.from(labels).join(', ') : '<empty>'),
            pullRequest: {
              code: pullRequest.code,
            },
          }
        );

        updateTasks.push(
          (): Promise<void> => (
            updatePullRequestLabels(
              pullRequest.code,
              Array.from(labels)
            )
          )
        );
      }

      if (updater.title.counter && updater.title.value !== pullRequest.title) {
        logger.action(
          'fix title: {current} => {new}',
          {
            current: chalk.yellow(pullRequest.title || '<empty>'),
            new: chalk.green(updater.title.value || '<empty>'),
            pullRequest: {
              code: pullRequest.code,
            },
          }
        );

        updateTasks.push(
          (): Promise<void> => (
            updatePullRequestTitile(
              pullRequest.code,
              updater.title.value
            )
          )
        );
      }

      if (updater.description.counter && updater.description.value !== pullRequest.description) {
        logger.action(
          'fix description: {current} => {new}',
          {
            current: chalk.yellow(pullRequest.description || '<empty>'),
            new: chalk.green(updater.description.value || '<empty>'),
            pullRequest: {
              code: pullRequest.code,
            },
          }
        );

        updateTasks.push(
          (): Promise<void> => (
            updatePullRequestDescription(
              pullRequest.code,
              updater.description.value
            )
          )
        );
      }

      if (updater.milestone.counter) {
        const milestones = await this._milestones.get();
        const milestone = milestones.find(
          (milestone: Milestone): boolean => (
            milestone.name === updater.milestone.value
          )
        );

        if (!milestone) {
          logger.error(
            'milestone "{milestone}" not found.',
            {
              milestone: updater.milestone.value,
              pullRequest,
            }
          );
        } else {
          if (updater.milestone.value !== pullRequest.milestone?.name) {
            logger.action(
              'fix milestone: {current} => {new}',
              {
                current: chalk.yellow(pullRequest.milestone?.name || '<empty>'),
                new: chalk.green(milestone?.name || '<empty>'),
                pullRequest: {
                  code: pullRequest.code,
                },
              }
            );

            updateTasks.push(
              (): Promise<void> => (
                updatePullRequestMilestone(
                  pullRequest.code,
                  milestone?.code ?? null,
                )
              )
            );
          }
        }
      }

      if (updater.addComments.length) {
        for (const comment of updater.addComments) {
          logger.action(
            'add comment: {comment}',
            {
              comment: chalk.green(
                comment.substr(
                  0,
                  comment.includes('\n') ? comment.indexOf('\n') : comment.length
                )
              ),
              pullRequest: {
                code: pullRequest.code,
              },
            }
          );

          updateTasks.push(
            (): Promise<number> => (
              addCommentToPullRequest(
                pullRequest.code,
                comment
              )
            )
          );
        }
      }

      if (updater.requestReviewers.size) {
        logger.action(
          'request code review: {users}',
          {
            users: chalk.green(Array.from(updater.requestReviewers).join(', ')),
            pullRequest: {
              code: pullRequest.code,
            },
          }
        );

        updateTasks.push(
          (): Promise<void> => (
            requestReviewers(
              pullRequest.code,
              Array.from(updater.requestReviewers)
            )
          )
        );
      }

      if (updater.removeRequestedReviewers.size) {
        logger.action(
          'withdraw request code review: {users}',
          {
            users: chalk.green(Array.from(updater.removeRequestedReviewers).join(', ')),
            pullRequest: {
              code: pullRequest.code,
            },
          }
        );

        updateTasks.push(
          (): Promise<void> => (
            removeRequestedReviewers(
              pullRequest.code,
              Array.from(updater.removeRequestedReviewers)
            )
          )
        );
      }

      if (updater.deleteBranches.size) {
        logger.action(
          'delete branches: {branches}',
          {
            branches: chalk.green(Array.from(updater.deleteBranches).join(', ')),
            pullRequest: {
              code: pullRequest.code,
            },
          }
        );

        updater.deleteBranches.forEach(
          (branchName: string): void => {
            updateTasks.push(
              (): Promise<void> => (
                deleteBranch(branchName)
              )
            );
          }
        );
      }

      return updateTasks;
    } catch (error) {
      logger.error(
        error.message || error,
        {
          pullRequest,
          error: error instanceof Error
            && {
              name: error.name,
              message: error.message,
              stack: error.stack
            }
            || error,
        }
      );

      (logger as unknown as IBufferable).flush();

      throw error;
    }
  }

  private createLogger(): ILogger & IBufferable {
    if (this._options.log === false) {
      // in any case, we leave the output to the console
      return new Logger();
    }

    if (typeof this._options.log === 'object' && this._options.log) {
      return new Logger({
        ...this._options.log,
        levels: Logger.defaultLevels,
      });
    }

    const maxsize = 10 * 1000 * 1000; // 10 Mb

    return new Logger({
      levels: Logger.defaultLevels,
      level: typeof this._options.log === 'string' && this._options.log ? this._options.log : 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(info => `${info.timestamp} ${info.level}: ${stringFomat(info.message, info)}`),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          level: 'error',
          filename: 'bighut-relabel-error.log',
          maxFiles: 0,
          maxsize,
          format: format.logstash(),
        }),
        new winston.transports.File({
          filename: 'bighut-relabel.log',
          maxFiles: 0,
          maxsize,
          format: format.logstash(),
        }),
      ],
    });
  }

}
