import { PullRequest } from '../../src/ApiProviders';
import { firstPullRequest } from './PullRequests/FirstPullRequest';
import { secondPullRequests } from './PullRequests/SecondPullRequest';

export const pullRequests: Array<PullRequest> = [
  firstPullRequest,
  secondPullRequests,
];
