import { Octokit } from '@octokit/rest';

import { IGitHubClient } from './IGitHubClient';
import {
  Commit,
  File,
  PullRequest,
  PullRequestStatus,
  User,
} from './Types';

export class GitHubClient implements IGitHubClient {

  private readonly _client: Octokit;

  private readonly _owner: string;

  private readonly _repo: string;

  constructor(token: string, owner: string, repo: string) {
    this._client = new Octokit({
      auth: token,
    });

    this._owner = owner;
    this._repo = repo;
  }

  public async getPullRequests(page?: number): Promise<Array<PullRequest>> {
    const pullRequests = (await this._client.pulls.list({
      owner: this._owner,
      repo: this._repo,
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
        state: item.state as any,
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
        comments: this.getComments(item.number),
        commits: this.getPullRequestCommits(item.number),
        statusInfo: this.getPullRequestStatus(item.number),
      };
    });
  }

  public async getPullRequestStatus(pullRequestNumber: number): Promise<PullRequestStatus> {
    const data = (await this._client.pulls.get({
      owner: this._owner,
      repo: this._repo,
      pull_number: pullRequestNumber,
    }))?.data;

    return {
      merged: data?.merged,
      mergeable: data?.mergeable,
      rebaseable: data?.rebaseable,
      mergeableState: data?.mergeable_state as any,
    };
  }

  public async getPullRequestFiles(branchName: string, pullRequestNumber: number): Promise<Array<File>> {
    // TODO: All files
    const data = (await this._client.pulls.listFiles({
      owner: this._owner,
      repo: this._repo,
      pull_number: pullRequestNumber,
      per_page: 100,
    }))?.data || [];

    return data.map((item): File => ({
      status: item.status as any,
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
    return (await this._client.repos.getContent({
      owner: this._owner,
      repo: this._repo,
      ref: branchName,
      path: filePath,
    }))?.data.content;
  }

  public async getPullRequestCommits(pullRequestNumber: number): Promise<Array<Commit>> {
    // TODO: All commits
    const data = (await this._client.pulls.listCommits({
      owner: this._owner,
      repo: this._repo,
      pull_number: pullRequestNumber,
      per_page: 100,
    }))?.data || [];

    return data.map((item): Commit => ({
      author: item.author && this.convertDataToUser(item.author),
      hash: item.sha,
      message: item.commit.message,
    }));
  }

  public async branchIsExists(branchName: string): Promise<boolean> {
    try {
      return !!(await this._client.repos.getBranch({
        owner: this._owner,
        repo: this._repo,
        branch: branchName,
      }))?.data;
    } catch {
      // TODO: Do not hide error
      return false;
    }
  }

  public async updatePullRequestLabels(pullRequestNumber: number, labels: Array<string>): Promise<void> {
    await this._client.issues.update({
      owner: this._owner,
      repo: this._repo,
      issue_number: pullRequestNumber,
      labels,
    });
  }

  public async updatePullRequestMilestone(pullRequestNumber: number, milestone: number): Promise<void> {
    await this._client.issues.update({
      owner: this._owner,
      repo: this._repo,
      issue_number: pullRequestNumber,
      milestone,
    });
  }

  public async updatePullRequestTitile(pullRequestNumber: number, title: string): Promise<void> {
    await this._client.issues.update({
      owner: this._owner,
      repo: this._repo,
      issue_number: pullRequestNumber,
      title,
    });
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
