import {
  Comment,
  Commit,
  File,
  PullRequest,
  PullRequestStatus,
  Review,
} from '../../../src/ApiProviders';
import { CacheableAction } from '../../../src/CacheableAction';
import { issue1Branch, mainBranch } from '../Branches';
import { emptyCacheableAction, emptyListOfCacheableAction } from '../Helpers';
import { loftSomsUser, msSoftLoUser } from '../Users';

export const approvedSimplePullRequest: PullRequest = {
  author: loftSomsUser,
  id: 999005000,
  code: 5000,
  description: null,
  htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/5000',
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
  reviews: new CacheableAction(() => Promise.resolve<Array<Review>>([
    {
      author: msSoftLoUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 7, 5, 20, 0),
      state: 'APPROVED',
    },
  ])),
};
