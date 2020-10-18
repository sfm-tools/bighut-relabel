import { File, PullRequest, PullRequestStatus } from './Types';

export interface IGitHubClient {

  getPullRequests(): Promise<Array<PullRequest>>;

  getPullRequestStatus(pullRequestNumber: number): Promise<PullRequestStatus>;

  getPullRequestFiles(branchName: string, pullRequestNumber: number): Promise<Array<File>>;

  getFileRaw(branchName: string, filePath: string): Promise<string>;

  branchIsExists(branchName: string): Promise<boolean>;

  updatePullRequestLabels(pullRequestNumber: number, labels: Array<string>): Promise<void>;

  updatePullRequestMilestone(pullRequestNumber: number, milestone: number): Promise<void>;

  updatePullRequestTitile(pullRequestNumber: number, title: string): Promise<void>;

}
