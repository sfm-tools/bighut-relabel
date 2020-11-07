import {
  Comment,
  Commit,
  File,
  PullRequest,
  PullRequestStatus,
  Review,
} from '../../../src/ApiProviders';
import { CacheableAction } from '../../../src/CacheableAction';
import { issue2Branch, mainBranch } from '../Branches';
import { flossTomUser, loftMossUser, msSoftLoUser } from '../Users';

export const secondPullRequests: PullRequest = {
  author: loftMossUser,
  code: 2,
  comments: new CacheableAction(() => Promise.resolve<Array<Comment>>([])),
  commits: new CacheableAction(() => Promise.resolve<Array<Commit>>([
    {
      author: loftMossUser,
      hash: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      message: 'Updated README.md',
    },
  ])),
  description: null,
  files: new CacheableAction(() => Promise.resolve<Array<File>>([
    {
      additions: 451324,
      changes: 1233324,
      deletions: 133,
      content: new CacheableAction(() => Promise.resolve('Awesome README')),
      filePath: 'README.md',
      patch: null,
      status: 'modified',
    },
  ])),
  htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/2',
  id: 999000902,
  labels: [],
  milestone: {
    id: 999000501,
    code: 1,
    name: 'Version 2.0',
  },
  sourceBranch: issue2Branch,
  targetBranch: mainBranch,
  state: 'open',
  title: 'Readme fixes',
  createdDate: new Date(2020, 9, 24, 0, 30, 0),
  reviews: new CacheableAction(() => Promise.resolve<Array<Review>>([
    {
      author: msSoftLoUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 7, 5, 20, 0),
      state: 'APPROVED',
    },
    {
      author: flossTomUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 7, 5, 22, 0),
      state: 'CHANGES_REQUESTED',
    },
    {
      author: loftMossUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 7, 5, 22, 42),
      state: 'COMMENTED',
    },
    {
      author: flossTomUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 7, 5, 23, 10),
      state: 'COMMENTED',
    },
    {
      author: msSoftLoUser,
      comment: null,
      commintId: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
      createdDate: new Date(2020, 10, 7, 5, 23, 15),
      state: 'CHANGES_REQUESTED',
    },
  ])),
  statusInfo: new CacheableAction(() => Promise.resolve<PullRequestStatus>({
    merged: false,
    mergeable: true,
    mergeableState: 'dirty',
    rebaseable: true,
    changedFiles: 1,
    comments: 0,
    commits: 1,
  })),
};
