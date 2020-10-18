import GitHub from 'github-api';

import { IGitHubClient } from './IGitHubClient';
import {
  Commit,
  File,
  PullRequest,
  PullRequestStatus,
  User
} from './Types';

export class GitHubClient implements IGitHubClient {

  private readonly client: GitHub;

  public readonly repoName: string;

  private readonly repo: {
    listPullRequests: (options: any) => Promise<any>,
    listPullRequestFiles: (number: number) => Promise<any>,
    listCommits: (params: { pull_number: number, page?: number, per_page?: number }) => Promise<any>,
    getPullRequest: (number: number) => Promise<any>,
    getContents: (ref: string, path: string, raw: boolean) => Promise<any>,
    getBranch: (name: string) => Promise<any>,
  };

  private readonly issueManager: any;

  constructor(token: string, username: string, repoName: string) {
    this.client = new GitHub({
      token,
    });

    this.repoName = repoName;

    this.repo = this.client.getRepo(username, repoName);
    this.issueManager = this.client.getIssues(username, repoName);
  }

  public async getPullRequests(page?: number): Promise<Array<PullRequest>> {
    const pullRequests = (await this.repo.listPullRequests({
      state: 'all',
      sort: 'created',
      direction: 'desc',
      page: page,
      per_page: 100,
    })).data || [];

    return pullRequests.map((item): PullRequest => {
      const sourceBranchIsExists = this.branchIsExists(item.head.ref);
      const targetBranchIsExists = this.branchIsExists(item.base.ref);

      return {
        id: item.id,
        code: item.number,
        state: item.state,
        title: item.title,
        description: item.body,
        labels: item.labels?.map((label): string => label.name) || [],
        htmlUrl: item.html_url,
        sourceBranch: {
          name: item.head.ref,
          isExists: sourceBranchIsExists,
        },
        targetBranch: {
          name: item.base.ref,
          isExists: targetBranchIsExists,
        },
        author: this.convertDataToUser(item.user),
        milestone: item.milestone && {
          id: item.milestone.id,
          name: item.milestone.title,
        },
        createdDate: item.created_at && new Date(item.created_at),
        updatedDate: item.updated_at && new Date(item.updated_at),
        mergedDate: item.merged_at && new Date(item.merged_at),
        closedDate: item.closed_at && new Date(item.closed_at),
        files: new Promise<Array<File>>(
          // eslint-disable-next-line no-async-promise-executor
          async(resolve: { (value?: Array<File> | PromiseLike<Array<File>>) }): Promise<void> => {
            const existsSource = await sourceBranchIsExists;

            resolve(
              await this.getPullRequestFiles(
                existsSource ? item.head.ref : item.base.ref,
                item.number
              )
            );
          }
        ),
        commits: this.getPullRequestCommits(item.number),
        statusInfo: this.getPullRequestStatus(item.number),
      };
    });
  }

  public async getPullRequestStatus(pullRequestNumber: number): Promise<PullRequestStatus> {
    const data = (await this.repo.getPullRequest(pullRequestNumber))?.data || {};

    return {
      merged: data.merged,
      mergeable: data.mergeable,
      rebaseable: data.rebaseable,
      mergeableState: data.mergeable_state,
    };
  }

  public async getPullRequestFiles(branchName: string, pullRequestNumber: number): Promise<Array<File>> {
    const data = (await this.repo.listPullRequestFiles(pullRequestNumber))?.data || [];

    return data.map((item): File => ({
      status: item.status,
      filePath: item.filename,
      patch: item.patch,
      additions: item.additions,
      deletions: item.deletions,
      changes: item.changes,
      content: item.status === 'removed'
        ? Promise.resolve(undefined)
        : this.getFileRaw(branchName, item.filename),
    }));
  }

  public async getFileRaw(branchName: string, filePath: string): Promise<string> {
    const result = (await this.repo.getContents(branchName, filePath, true)).data;

    return result;
  }

  public async getPullRequestCommits(code: number): Promise<Array<Commit>> {
    const data = (await this.repo.listCommits({
      pull_number: code,
      per_page: 1000,
    }))?.data || [];

    return data.map((item): Commit => ({
      author: item.author && this.convertDataToUser(item.author),
      hash: item.sha,
      message: item.commit.message,
    }));
  }

  public async branchIsExists(branchName: string): Promise<boolean> {
    try {
      return (await this.repo.getBranch(branchName))?.data !== null;
    } catch {
      // TODO: Do not hide error
      return false;
    }
  }

  public updatePullRequestLabels(pullRequestNumber: number, labels: Array<string>): Promise<void> {
    return this.issueManager.editIssue(pullRequestNumber, { labels });
  }

  public updatePullRequestMilestone(pullRequestNumber: number, milestone: number): Promise<void> {
    return this.issueManager.editIssue(pullRequestNumber, { milestone });
  }

  public updatePullRequestTitile(pullRequestNumber: number, title: string): Promise<void> {
    return this.issueManager.editIssue(pullRequestNumber, { title });
  }

  private convertDataToUser(data: any): User {
    return {
      avatarUrl: data.avatar_url,
      id: data.id,
      login: data.login,
      profileUrl: data.html_url,
    };
  }

}
