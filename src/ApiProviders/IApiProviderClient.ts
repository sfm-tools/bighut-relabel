import {
  Comment,
  Commit,
  File,
  Milestone,
  PullRequest,
  PullRequestStatus,
  RateLimit,
  Review,
} from './Types';

export interface IApiProviderClient {

  readonly owner: string;

  readonly repo: string;

  getPullRequests(page?: number, pageSize?: number): Promise<Array<PullRequest>>;

  getPullRequestStatus(pullRequestNumber: number): Promise<PullRequestStatus>;

  getPullRequestFiles(branchName: string, pullRequestNumber: number, page?: number): Promise<Array<File>>;

  getFileRaw(branchName: string, filePath: string): Promise<string>;

  getPullRequestCommits(pullRequestNumber: number, page?: number): Promise<Array<Commit>>;

  getPullRequestReviewList(pullRequestNumber: number, page?: number): Promise<Array<Review>>;

  getComments(pullRequestNumber: number, page?: number): Promise<Array<Comment>>;

  getMilestones(): Promise<Array<Milestone>>;

  branchIsExists(branchName: string): Promise<boolean>;

  updatePullRequestLabels(pullRequestNumber: number, labels: Array<string>): Promise<void>;

  updatePullRequestMilestone(pullRequestNumber: number, milestoneNumber: number): Promise<void>;

  updatePullRequestTitile(pullRequestNumber: number, title: string): Promise<void>;

  updatePullRequestDescription(pullRequestNumber: number, description: string): Promise<void>;

  addCommentToPullRequest(pullRequestNumber: number, text: string): Promise<number>;

  requestReviewers(pullRequestNumber: number, usernames: Array<string>): Promise<void>;

  removeRequestedReviewers(pullRequestNumber: number, usernames: Array<string>): Promise<void>;

  getRateLimit(): Promise<RateLimit>;

}
