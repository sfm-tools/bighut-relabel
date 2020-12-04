import {
  Comment,
  Commit,
  File,
  PullRequest,
  PullRequestStatus,
  Review,
} from '../../../src/ApiProviders';
import { emptyCacheableAction, emptyListOfCacheableAction } from '../../Helpers';
import { issue1Branch, mainBranch } from '../Branches';
import { flossTomUser } from '../Users';

export const mergedPullRequest: PullRequest = {
  author: flossTomUser,
  id: 999005905,
  code: 5905,
  description: null,
  htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/5905',
  labels: [],
  milestone: null,
  state: 'closed',
  title: 'Merged test',
  sourceBranch: issue1Branch,
  targetBranch: mainBranch,
  createdDate: new Date(2020, 10, 15, 23, 15, 0),
  mergedDate: new Date(2020, 10, 16, 1, 15, 25),
  comments: emptyListOfCacheableAction<Comment>(),
  commits: emptyListOfCacheableAction<Commit>(),
  files: emptyListOfCacheableAction<File>(),
  statusInfo: emptyCacheableAction<PullRequestStatus>(),
  reviews: emptyListOfCacheableAction<Review>(),
  requestedReviewers: [],
};
