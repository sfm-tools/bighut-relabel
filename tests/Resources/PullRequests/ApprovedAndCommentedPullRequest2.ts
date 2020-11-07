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
import { flossTomUser, loftSomsUser, msSoftLoUser } from '../Users';

export const approvedAndCommentedPullRequest2: PullRequest = {
  author: flossTomUser,
  id: 999005002,
  code: 5002,
  description: null,
  htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/5002',
  labels: [],
  milestone: null,
  state: 'open',
  title: 'Readme fixes',
  sourceBranch: issue1Branch,
  targetBranch: mainBranch,
  createdDate: new Date(2020, 10, 8, 0, 9, 0),
  comments: emptyListOfCacheableAction<Comment>(),
  commits: emptyListOfCacheableAction<Commit>(),
  files: emptyListOfCacheableAction<File>(),
  statusInfo: emptyCacheableAction<PullRequestStatus>(),
  reviews: new CacheableAction(() => Promise.resolve<Array<Review>>([
    {
      author: msSoftLoUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 5, 24, 41),
      state: 'COMMENTED',
    },
    {
      author: flossTomUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 5, 25, 11),
      state: 'COMMENTED',
    },
    {
      author: loftSomsUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 5, 27, 55),
      state: 'APPROVED',
    },
  ])),
};
