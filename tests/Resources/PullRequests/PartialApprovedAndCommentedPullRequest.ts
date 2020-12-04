import {
  Comment,
  Commit,
  File,
  PullRequest,
  PullRequestStatus,
  Review,
} from '../../../src/ApiProviders';
import { CacheableAction } from '../../../src/CacheableAction';
import { emptyCacheableAction, emptyListOfCacheableAction } from '../../Helpers';
import { issue1Branch, mainBranch } from '../Branches';
import {
  flossMotUser,
  flossTomUser,
  loftMossUser,
  loftSomsUser,
  msSoftLoUser,
} from '../Users';

export const partialApprovedAndCommentedPullRequest: PullRequest = {
  author: flossTomUser,
  id: 999005300,
  code: 5300,
  description: null,
  htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/5300',
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
  requestedReviewers: [],
  reviews: new CacheableAction(() => Promise.resolve<Array<Review>>([
    {
      author: msSoftLoUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 0, 0),
      state: 'COMMENTED',
    },
    {
      author: flossTomUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 1, 0),
      state: 'COMMENTED',
    },
    {
      author: flossTomUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 2, 0),
      state: 'COMMENTED',
    },
    {
      author: flossTomUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 3, 0),
      state: 'CHANGES_REQUESTED',
    },
    {
      author: flossTomUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 4, 0),
      state: 'COMMENTED',
    },
    {
      author: flossTomUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 5, 0),
      state: 'COMMENTED',
    },
    {
      author: flossTomUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 6, 0),
      state: 'COMMENTED',
    },
    {
      author: loftSomsUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 7, 0),
      state: 'COMMENTED',
    },
    {
      author: loftSomsUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 8, 0),
      state: 'COMMENTED',
    },
    {
      author: loftSomsUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 9, 1),
      state: 'APPROVED',
    },
    {
      author: loftMossUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 10, 1),
      state: 'CHANGES_REQUESTED',
    },
    {
      author: flossMotUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 11, 1),
      state: 'APPROVED',
    },
    {
      author: flossMotUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 8, 1, 11, 5),
      state: 'COMMENTED',
    },
  ])),
};
