import { Octokit } from '@octokit/rest';

import { Cache } from '../Cache';
import { ICache } from '../Interfaces';
import { IGitHubClient } from './IGitHubClient';
import {
  Comment,
  Commit,
  File,
  Milestone,
  PullRequest,
  PullRequestStatus,
  User,
} from './Types';

export class GitHubClient implements IGitHubClient {

  private readonly _client: Octokit;

  private readonly _cache: ICache = new Cache();

  public readonly owner: string;

  public readonly repo: string;

  constructor(token: string, owner: string, repo: string) {
    this._client = new Octokit({
      auth: token,
    });

    this.owner = owner;
    this.repo = repo;

    this.addCommentToPullRequest = this.addCommentToPullRequest.bind(this);
    this.branchIsExists = this.branchIsExists.bind(this);
    this.convertDataToUser = this.convertDataToUser.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getFileRaw = this.getFileRaw.bind(this);
    this.getMilestones = this.getMilestones.bind(this);
    this.getPullRequestCommits = this.getPullRequestCommits.bind(this);
    this.getPullRequestFiles = this.getPullRequestFiles.bind(this);
    this.getPullRequestStatus = this.getPullRequestStatus.bind(this);
    this.getPullRequests = this.getPullRequests.bind(this);
    this.updatePullRequestDescription = this.updatePullRequestDescription.bind(this);
    this.updatePullRequestLabels = this.updatePullRequestLabels.bind(this);
    this.updatePullRequestMilestone = this.updatePullRequestMilestone.bind(this);
    this.updatePullRequestTitile = this.updatePullRequestTitile.bind(this);
  }

  public async getPullRequests(page?: number): Promise<Array<PullRequest>> {
    const pullRequests = (await this._client.pulls.list({
      owner: this.owner,
      repo: this.repo,
      state: 'all',
      sort: 'created',
      direction: 'desc',
      page: page,
      per_page: 100,
    })).data || [];

    return pullRequests.map((item): PullRequest => {
      const sourceBranchIsExists = (): Promise<boolean> => this.branchIsExists(item.head.ref);
      const targetBranchIsExists = (): Promise<boolean> => this.branchIsExists(item.base.ref);

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
        files: async(): Promise<Array<File>> => {
          const existsSource = await sourceBranchIsExists();
          return this.getPullRequestFiles(
            existsSource ? item.head.ref : item.base.ref,
            item.number
          );
        },
        comments: (): Promise<Array<Comment>> => this.getComments(item.number),
        commits: (): Promise<Array<Commit>> => this.getPullRequestCommits(item.number),
        statusInfo: (): Promise<PullRequestStatus> => this.getPullRequestStatus(item.number),
      };
    });
  }

  public async getPullRequestStatus(pullRequestNumber: number): Promise<PullRequestStatus> {
    const data = (await this._client.pulls.get({
      owner: this.owner,
      repo: this.repo,
      pull_number: pullRequestNumber,
    })).data;

    return {
      merged: data?.merged,
      mergeable: data?.mergeable,
      rebaseable: data?.rebaseable,
      mergeableState: data?.mergeable_state as any,
      commits: data.commits,
      comments: data.comments,
      changedFiles: data.changed_files,
    };
  }

  public async getPullRequestFiles(branchName: string, pullRequestNumber: number): Promise<Array<File>> {
    // TODO: All files
    const data = (await this._client.pulls.listFiles({
      owner: this.owner,
      repo: this.repo,
      pull_number: pullRequestNumber,
      per_page: 100,
    })).data || [];

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
      owner: this.owner,
      repo: this.repo,
      ref: branchName,
      path: filePath,
    })).data.content;
  }

  public async getPullRequestCommits(pullRequestNumber: number): Promise<Array<Commit>> {
    // TODO: All commits
    const data = (await this._client.pulls.listCommits({
      owner: this.owner,
      repo: this.repo,
      pull_number: pullRequestNumber,
      per_page: 100,
    })).data || [];

    return data.map((item): Commit => ({
      author: item.author && this.convertDataToUser(item.author),
      hash: item.sha,
      message: item.commit.message,
    }));
  }

  public async getComments(pullRequestNumber: number): Promise<Array<Comment>> {
    // TODO: pulls.listReviewComments and issues.listComments - these are different comments.
    // Need to understand which ones we should use.
    // It might be worth making separate methods or combining comments from different sources.

    // TODO: All comments
    const data = (await this._client.issues.listComments({
      owner: this.owner,
      repo: this.repo,
      issue_number: pullRequestNumber,
      per_page: 100,
    })).data || [];

    return data.map((item): Comment => ({
      id: item.id,
      author: item.user && this.convertDataToUser(item.user),
      text: item.body,
      createdDate: new Date(item.created_at),
      updatedDate: item.updated_at && new Date(item.updated_at),
    }));
  }

  public async getMilestones(): Promise<Array<Milestone>> {
    const cacheKey = `${this.owner}/${this.repo}/getMilestones`;

    if (this._cache.has(cacheKey)) {
      return this._cache.get<Array<Milestone>>(cacheKey);
    }

    const data = (await this._client.issues.listMilestones({
      owner: this.owner,
      repo: this.repo,
      page: 1,
      per_page: 100,
    })).data || [];

    const result = data.map((item): Milestone => ({
      id: item.id,
      name: item.title,
    }));

    this._cache.add(cacheKey, result, 30);

    return result;
  }

  public async branchIsExists(branchName: string): Promise<boolean> {
    try {
      return !!(await this._client.repos.getBranch({
        owner: this.owner,
        repo: this.repo,
        branch: branchName,
      })).data;
    } catch {
      // TODO: Do not hide error
      return false;
    }
  }

  public async updatePullRequestLabels(pullRequestNumber: number, labels: Array<string>): Promise<void> {
    await this._client.issues.update({
      owner: this.owner,
      repo: this.repo,
      issue_number: pullRequestNumber,
      labels,
    });
  }

  public async updatePullRequestMilestone(pullRequestNumber: number, milestoneId: number): Promise<void> {
    await this._client.issues.update({
      owner: this.owner,
      repo: this.repo,
      issue_number: pullRequestNumber,
      milestone: milestoneId,
    });
  }

  public async updatePullRequestTitile(pullRequestNumber: number, title: string): Promise<void> {
    await this._client.issues.update({
      owner: this.owner,
      repo: this.repo,
      issue_number: pullRequestNumber,
      title,
    });
  }

  public async updatePullRequestDescription(pullRequestNumber: number, description: string): Promise<void> {
    await this._client.issues.update({
      owner: this.owner,
      repo: this.repo,
      issue_number: pullRequestNumber,
      body: description,
    });
  }

  public async addCommentToPullRequest(pullRequestNumber: number, text: string): Promise<number> {
    return (await this._client.issues.createComment({
      owner: this.owner,
      repo: this.repo,
      issue_number: pullRequestNumber,
      body: text,
    })).data?.id;
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
