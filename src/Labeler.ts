import chalk from 'chalk';
import queue from 'queue';

import { IActionExecutor } from './ActionExecutors';
import { Config } from './Config';
import { IGitHubClient, Milestone } from './GitHubClient';
import { LabelerContext } from './LabelerContext';

export class Labeler {

  private readonly _client: IGitHubClient;

  private readonly _actions: Array<IActionExecutor>;

  private readonly _milestones: Promise<Array<Milestone>>;

  constructor(config: Config, gitHubClient: IGitHubClient) {
    this._actions = config['_actions'] as Array<IActionExecutor>;
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
      autostart: true,
    });

    console.log(
      'Processing pull requests for',
      chalk.yellow(this._client.repo),
      'using',
      chalk.yellow(this._client.owner),
      'token',
    );

    const pullRequests = await this._client.getPullRequests();

    for (const pullRequest of pullRequests) {
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

      console.log(`..${pullRequest.htmlUrl}`);

      const context = new LabelerContext(pullRequest);

      for (let i = 0, ic = this._actions.length; i < ic; ++i) {
        const action = this._actions[i];
        await action.execute(context);

        if (context.stopped) {
          console.log(`..actions check stopped on ${i} of ${ic}`);
          break;
        }
      }

      q.push(
        (): Promise<void> => {
          return this.updatePullRequest(context, test);
        }
      );
    }
  }

  private async updatePullRequest(context: LabelerContext, test: boolean): Promise<void> {
    const {
      pullRequest,
      updater,
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

    const updaterTasks = new Array<Promise<any>>();
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
      console.log(
        '..fix labels:',
        chalk.yellow(pullRequest.labels.length ? pullRequest.labels.join(', ') : '<empty>'),
        '=>',
        chalk.green(labels.size ? Array.from(labels).join(', ') : '<empty>')
      );

      updaterTasks.push(
        updatePullRequestLabels(
          pullRequest.code,
          Array.from(updater.addLabels)
        )
      );
    }

    if (updater.title.counter) {
      console.log(
        '..fix title:',
        chalk.yellow(pullRequest.title || '<empty>'),
        '=>',
        chalk.green(updater.title.value || '<empty>')
      );

      updaterTasks.push(
        updatePullRequestTitile(
          pullRequest.code,
          updater.title.value
        )
      );
    }

    if (updater.description.counter) {
      console.log(
        '..fix description:',
        chalk.yellow(pullRequest.description || '<empty>'),
        '=>',
        chalk.green(updater.description.value || '<empty>')
      );

      updaterTasks.push(
        updatePullRequestDescription(
          pullRequest.code,
          updater.description.value
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
        console.error(`..milestone "${updater.milestone.value}" not found.`);
      } else {
        console.log(
          '..fix milestone:',
          chalk.yellow(pullRequest.milestone?.name || '<empty>'),
          '=>',
          chalk.green(milestone?.name || '<empty>')
        );

        updaterTasks.push(
          updatePullRequestMilestone(
            pullRequest.code,
            milestone?.id ?? null,
          )
        );
      }
    }

    if (updater.addComments.length) {
      for (const comment of updater.addComments) {
        console.log(
          '..add comment:',
          chalk.green(
            comment.substr(
              0,
              comment.includes('\n') ? comment.indexOf('\n') : comment.length
            )
          )
        );

        updaterTasks.push(
          addCommentToPullRequest(
            pullRequest.code,
            comment
          )
        );
      }
    }

    if (!test && updaterTasks.length) {
      await Promise.all(updaterTasks);
    }
  }

}
