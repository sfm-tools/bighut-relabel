import chalk from 'chalk';
import queue from 'queue';

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
} from './Interfaces';
import { LabelerContext } from './LabelerContext';
import { LabelerOptions } from './Types';

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
    return this.processPullRequests(true);
  }

  public fix(): Promise<void> {
    return this.processPullRequests();
  }

  private async processPullRequests(test?: boolean): Promise<void> {
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

    console.log(
      'Processing pull requests for',
      chalk.yellow(this._client.repo),
      'using',
      chalk.yellow(this._client.owner),
      'token',
      'in',
      chalk.yellow(test ? 'test' : 'fix'),
      'mode.'
    );

    if (rateLimitNotify) {
      const rateLimit = await this._client.getRateLimit();

      if (rateLimit.used > rateLimitNotify) {
        console.warn(
          'Request exceeded notification: used',
          rateLimit.used,
          'of',
          rateLimit.limit,
          'requests.'
        );
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

      if (cacheOptions.ttl) {
        await this._cache.load();
      }

      const logSkipped = (pullRequest: PullRequest, reason: string): void => {
        console.log(
          'Pull Request #',
          pullRequest.code.toString(), // string - so that there is no highlight in the terminal
          'from',
          pullRequest.sourceBranch.name,
          'into',
          pullRequest.targetBranch.name,
          'by',
          pullRequest.author.login
        );
        console.log('..skipped:', reason);
      };

      for (const pullRequest of pullRequests) {
        if (allowedToHandle && !allowedToHandle(pullRequest)) {
          logSkipped(pullRequest, 'labeler options');
          continue;
        }

        const cacheKey = `pr-${pullRequest.code}`;

        if (this._cache.has(cacheKey)) {
          logSkipped(
            pullRequest,
            `cached until ${new Date(this._cache.getTtl(cacheKey))}`
          );
          continue;
        }

        const context = new LabelerContext(pullRequest, test);

        q.push(
          async(): Promise<void> => {
            context.log(
              'Pull Request #',
              context.pullRequest.code.toString(), // string - so that there is no highlight in the terminal
              'from',
              context.pullRequest.sourceBranch.name,
              'into',
              context.pullRequest.targetBranch.name,
              'by',
              context.pullRequest.author.login
            );

            context.log(`..${context.pullRequest.htmlUrl}`);

            for (let i = 0, ic = this._actions.length; i < ic; ++i) {
              const action = this._actions[i];

              if (action.linked && !action.linked.executed) {
                continue;
              }

              try {
                await action.execute(context);
              } catch (error) {
                context.log(
                  chalk.red(`..an error occurred while executing an action ${i + 1} of ${ic}:`),
                  chalk.red(error.message)
                );
                (context.logger as unknown as IBufferable).flush();
                throw error;
              }

              if (context.stopped) {
                context.log(`..actions check stopped on ${i + 1} of ${ic}${context.stopComments ? '; comment: ' + context.stopComments : ''}`);
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
                context.log(
                  chalk.red('..an error occurred while executing update tasks:'),
                  chalk.red(error.message)
                );
                (context.logger as unknown as IBufferable).flush();
                throw error;
              }
            }

            (context.logger as unknown as IBufferable).flush();

            cacheOptions.ttl
              && this._cache.add(cacheKey, true, cacheOptions.ttl);
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

        return true;
      };

      q.start();
    });

    if (cacheOptions.ttl) {
      this._cache.save();
    }
  }

  private async createUpdateTasks(context: LabelerContext): Promise<Array<{ (): Promise<any> }>> {
    const {
      pullRequest,
      updater,
      log,
    } = context;

    const {
      updatePullRequestLabels,
      updatePullRequestMilestone,
      updatePullRequestTitile,
      updatePullRequestDescription,
      addCommentToPullRequest,
    } = this._client;

    if (updater.tasks.length) {
      for (const task of updater.tasks) {
        await task({
          githubClient: this._client,
          labelerContext: context,
        });
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
      log(
        '..fix labels:',
        chalk.yellow(pullRequest.labels.length ? pullRequest.labels.join(', ') : '<empty>'),
        '=>',
        chalk.green(labels.size ? Array.from(labels).join(', ') : '<empty>')
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
      log(
        '..fix title:',
        chalk.yellow(pullRequest.title || '<empty>'),
        '=>',
        chalk.green(updater.title.value || '<empty>')
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
      log(
        '..fix description:',
        chalk.yellow(pullRequest.description || '<empty>'),
        '=>',
        chalk.green(updater.description.value || '<empty>')
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
        log(chalk.red(`..milestone "${updater.milestone.value}" not found.`));
      } else {
        if (updater.milestone.value !== pullRequest.milestone?.name) {
          log(
            '..fix milestone:',
            chalk.yellow(pullRequest.milestone?.name || '<empty>'),
            '=>',
            chalk.green(milestone?.name || '<empty>')
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
        log(
          '..add comment:',
          chalk.green(
            comment.substr(
              0,
              comment.includes('\n') ? comment.indexOf('\n') : comment.length
            )
          )
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

    return updateTasks;
  }

}
