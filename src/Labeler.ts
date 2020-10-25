import chalk from 'chalk';
import queue from 'queue';

import { IGitHubClient, Milestone } from './GitHubClient';
import {
  IAction,
  IActionCollection,
  IActionExecutor,
  IBufferable,
  IConfig,
} from './Interfaces';
import { LabelerContext } from './LabelerContext';

export class Labeler {

  private readonly _client: IGitHubClient;

  private readonly _actions: Array<IActionExecutor<IAction>>;

  private readonly _milestones: Promise<Array<Milestone>>;

  constructor(config: IConfig | IActionCollection, gitHubClient: IGitHubClient) {
    this._actions = (config as IActionCollection).actions;
    this._client = gitHubClient;
    // TODO: Something went wrong. This code shouldn't be here.
    // Need to figure out how to fix this.
    this._milestones = gitHubClient.getMilestones();
  }

  public test(): Promise<void> {
    return this.processPullRequests(true);
  }

  public fix(): Promise<void> {
    return this.processPullRequests();
  }

  private async processPullRequests(test?: boolean): Promise<void> {
    const q = queue({
      autostart: false,
      // TODO: config
      concurrency: 3, // GitHub limits - 5000 requests per hour
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

    const pullRequests = await this._client.getPullRequests();

    for (const pullRequest of pullRequests) {
      const context = new LabelerContext(pullRequest);

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

            await action.execute(context);

            if (context.stopped) {
              context.log(`..actions check stopped on ${i} of ${ic}`);
              break;
            }
          }

          const updateTasks = await this.createUpdateTasks(context);

          (context.logger as unknown as IBufferable).flush();

          if (!test && updateTasks.length) {
            await Promise.all(updateTasks);
          }
        }
      );
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
      updater.addLabels.forEach(labels.delete, labels);
    }

    if (
      (labels.size === 0 && pullRequest.labels.length > 0)
      || Array.from(labels).some((label: string): boolean => !pullRequest.labels.includes(label))
    ) {
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
            Array.from(updater.addLabels)
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
      const milestones = await this._milestones;
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
                milestone?.id ?? null,
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
