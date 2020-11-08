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
import { msSoftLoUser } from '../Users';

export const noReviewPullRequest: PullRequest = {
  author: msSoftLoUser,
  id: 999005200,
  code: 5200,
  description: null,
  htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/5200',
  labels: [],
  milestone: null,
  state: 'open',
  title: 'Readme fixes',
  sourceBranch: issue1Branch,
  targetBranch: mainBranch,
  createdDate: new Date(2020, 9, 24, 0, 30, 0),
  comments: emptyListOfCacheableAction<Comment>(),
  commits: emptyListOfCacheableAction<Commit>(),
  files: emptyListOfCacheableAction<File>(),
  statusInfo: emptyCacheableAction<PullRequestStatus>(),
  reviews: emptyListOfCacheableAction<Review>(),
};
