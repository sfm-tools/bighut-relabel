import {
  Comment,
  Commit,
  File,
  Milestone,
  PullRequest,
  PullRequestStatus,
} from './Types';

export interface IGitHubClient {

  readonly owner: string;

  readonly repo: string;

  getPullRequests(page?: number, pageSize?: number): Promise<Array<PullRequest>>;

  getPullRequestStatus(pullRequestNumber: number): Promise<PullRequestStatus>;

  getPullRequestFiles(branchName: string, pullRequestNumber: number, page?: number): Promise<Array<File>>;

  getFileRaw(branchName: string, filePath: string): Promise<string>;

  getPullRequestCommits(pullRequestNumber: number): Promise<Array<Commit>>;

  getComments(pullRequestNumber: number): Promise<Array<Comment>>;

  getMilestones(): Promise<Array<Milestone>>;

  branchIsExists(branchName: string): Promise<boolean>;

  updatePullRequestLabels(pullRequestNumber: number, labels: Array<string>): Promise<void>;

  updatePullRequestMilestone(pullRequestNumber: number, milestoneId: number): Promise<void>;

  updatePullRequestTitile(pullRequestNumber: number, title: string): Promise<void>;

  updatePullRequestDescription(pullRequestNumber: number, description: string): Promise<void>;

  addCommentToPullRequest(pullRequestNumber: number, text: string): Promise<number>;

}
