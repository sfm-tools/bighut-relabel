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

export const closedPullRequest: PullRequest = {
  author: flossTomUser,
  id: 999005901,
  code: 5901,
  description: null,
  htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/5901',
  labels: [],
  milestone: null,
  state: 'closed',
  title: 'Closed test',
  sourceBranch: issue1Branch,
  targetBranch: mainBranch,
  createdDate: new Date(2020, 10, 15, 23, 15, 0),
  comments: emptyListOfCacheableAction<Comment>(),
  commits: emptyListOfCacheableAction<Commit>(),
  files: emptyListOfCacheableAction<File>(),
  statusInfo: emptyCacheableAction<PullRequestStatus>(),
  reviews: emptyListOfCacheableAction<Review>(),
  requestedReviewers: [],
};
