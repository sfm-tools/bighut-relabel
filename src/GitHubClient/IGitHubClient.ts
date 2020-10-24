import {
  Comment,
  Commit,
  File,
  PullRequest,
  PullRequestStatus,
} from './Types';

export interface IGitHubClient {

  getPullRequests(): Promise<Array<PullRequest>>;

  getPullRequestStatus(pullRequestNumber: number): Promise<PullRequestStatus>;

  getPullRequestFiles(branchName: string, pullRequestNumber: number): Promise<Array<File>>;

  getFileRaw(branchName: string, filePath: string): Promise<string>;

  getPullRequestCommits(pullRequestNumber: number): Promise<Array<Commit>>;

  getComments(pullRequestNumber: number): Promise<Array<Comment>>;

  branchIsExists(branchName: string): Promise<boolean>;

  updatePullRequestLabels(pullRequestNumber: number, labels: Array<string>): Promise<void>;

  updatePullRequestMilestone(pullRequestNumber: number, milestone: number): Promise<void>;

  updatePullRequestTitile(pullRequestNumber: number, title: string): Promise<void>;

  updatePullRequestDescription(pullRequestNumber: number, description: string): Promise<void>;

}
