import chalk from 'chalk';
import GitHub from 'github-api';
import { config } from './Config';

const log = console.log;

export class GitHubLabeler {

  private readonly client: GitHub;

  private readonly username: string;

  public readonly repoName: string;

  private readonly repo: {
    listPullRequests: (options: any) => Promise<any>,
    listPullRequestFiles: (number: number) => Promise<any>,
    getContents: (ref: string, path: string, raw: boolean) => Promise<any>,
  };

  private readonly issueManager: any;

  constructor(token: string, user: string, repo: string) {
    this.client = new GitHub({
      token,
    });

    this.username = user;
    this.repoName = repo;

    this.repo = this.client.getRepo(user, repo);
    this.issueManager = this.client.getIssues(user, repo);

    this.test = this.test.bind(this);
    this.execute = this.execute.bind(this);
    this.getPullRequests = this.getPullRequests.bind(this);
    this.getPullRequestFiles = this.getPullRequestFiles.bind(this);
    this.getFileRaw = this.getFileRaw.bind(this);
    this.checkLabels = this.checkLabels.bind(this);
    this.updateLabels = this.updateLabels.bind(this);
    this.updateMilestone = this.updateMilestone.bind(this);
    this.updateTitile = this.updateTitile.bind(this);
  }

  public async test(): Promise<void> {
    return this.checkPullRequests(true, true);
  }

  public async execute(): Promise<void> {
    return this.checkPullRequests(false, false);
  }

  private async checkPullRequests(test: boolean, verbose: boolean): Promise<void> {
    const pullRequests = await this.getPullRequests();
    const repoMilestones: Array<{title: string, number: number}> = (await this.issueManager.listMilestones()).data;
    const findMilestone = (name: string) => (
      repoMilestones.find(item => (
        item.title === name
      ))
    );

    for (const pullRequest of pullRequests) {
      const number = pullRequest.number;
      const labels: Array<string> = pullRequest.labels?.map(label => label.name) || [];
      const title: string = pullRequest.title;
      const milestone = pullRequest.milestone;
      const sourceBranch = pullRequest.head.ref;
      const targetBranch = pullRequest.base.ref;
      const files = await this.getPullRequestFiles(number);

      log(
        'Pull Request #',
        number,
        'from',
        chalk.yellow(sourceBranch),
        'into',
        chalk.green(targetBranch),
      );

      log(`..${pullRequest.url}`);

      let labelsRequired = [];
      let migrationsRequired = [];

      for (const file of files) {
        labelsRequired = [
          ...new Set([
            ...labelsRequired,
            ...(await this.checkLabels(labels, file.filename))
          ])
        ];

        // TODO: config
        // is migration
        if (
          labelsRequired.includes('back end')
          && !labelsRequired.includes('migration')
        ) {
          const fileContent = await this.getFileRaw(sourceBranch, file.filename);

          if (fileContent.includes('[Migration(')) {
            labelsRequired.push('migration');

            const migrationNumber = /\[Migration\((?<number>[^\)]+)\)\]/g.exec(fileContent).groups?.number;

            if (
              migrationNumber
              && !migrationsRequired.includes(migrationNumber)
              && !title.includes(migrationNumber)
            ) {
              migrationsRequired.push(migrationNumber);
            }
          }
        }
      }
      // --

      if (labels.length !== labelsRequired.length) {
        log(
          '..fix labels:',
          chalk.yellow(labels.length ? labels.join(', ') : '<empty>'),
          '=>',
          chalk.green(labelsRequired.join(', '))
        );

        if (!test) {
          await this.updateLabels(number, labelsRequired);
        }
      }

      if (migrationsRequired.length > 0) {
        const newTitle = `${title} (${migrationsRequired.join(', ')})`;

        log(
          '..fix title:',
          chalk.yellow(title),
          '=>',
          chalk.green(newTitle)
        );

        if (!test) {
          this.updateTitile(number, newTitle);
        }
      }

      if (milestone) {
        const milestoneConfig = config.milestone.find(item => (
          item.milestone === milestone.title
        ));

        if (milestoneConfig) {
          if (!milestoneConfig.branches.includes(targetBranch)) {
            const milestoneConfig = config.milestone.find(item => (
              item.branches.includes(targetBranch)
            ));

            if (milestoneConfig) {
              const repoMilestone = findMilestone(milestoneConfig.milestone);

              if (!repoMilestone) {
                log(chalk.red(`..Milestone "${milestoneConfig.milestone}" not found.`));
              } else {
                log(
                  '..fix milestone:',
                  chalk.yellow(milestone.title),
                  '=>',
                  chalk.green(repoMilestone.title)
                );

                if (!test) {
                  await this.updateMilestone(number, repoMilestone.number);
                }
              }
            } else {
              log(chalk.yellow(`..No associated milestone with branch "${targetBranch}".`));
            }
          }
        } else {
          log(chalk.yellow(`..No config for milestone "${milestone.title}".`));
        }
      } else {
        const milestoneConfig = config.milestone.find(item => (
          item.branches.includes(targetBranch)
        ));

        if (milestoneConfig) {
          const repoMilestone = findMilestone(milestoneConfig.milestone);

          if (!repoMilestone) {
            log(chalk.red(`..Milestone "${milestoneConfig.milestone}" not found.`));
          } else {
            log(
              '..fix milestone:',
              chalk.yellow('<empty>'),
              '=>',
              chalk.green(repoMilestone.title)
            );

            if (!test) {
              await this.updateMilestone(number, repoMilestone.number);
            }
          }
        } else {
          log(chalk.yellow(`..No associated milestone with branch "${targetBranch}".`));
        }
      }
    }
  }

  private async getPullRequests(): Promise<Array<any>> {
    return (await this.repo.listPullRequests({
      state: 'all',
      sort: 'created',
      direction: 'desc',
    })).data || [];
  }

  private async getPullRequestFiles(pullRequestNumber: number): Promise<Array<any>> {
    return (await this.repo.listPullRequestFiles(pullRequestNumber))?.data || [];
  }

  private async checkLabels(labels: Array<string>, filePath: string): Promise<Array<string>> {
    const result = [...labels];

    for (const { label, test } of config.labels) {
      if (test(filePath)) {
        if (!result.includes(label)) {
          result.push(label);
        }
      }
    }

    return result;
  }

  private async getFileRaw(branchName: string, filePath: string): Promise<string> {
    return (await this.repo.getContents(branchName, filePath, true)).data;
  }

  private updateLabels(number: number, labels: Array<string>): Promise<void> {
    return this.issueManager.editIssue(number, { labels });
  }

  private updateMilestone(number: number, milestone: number): Promise<void> {
    return this.issueManager.editIssue(number, { milestone });
  }

  private updateTitile(number: number, title: string): Promise<void> {
    return this.issueManager.editIssue(number, { title });
  }

}
