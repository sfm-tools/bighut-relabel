import { Commit, PullRequest } from '../../src/GitHubClient';
import { flossTomUser } from './Users';

export const pullRequests: Array<PullRequest> = [
  {
    author: flossTomUser,
    code: 1,
    commits: Promise.resolve<Array<Commit>>([
      {
        author: flossTomUser,
        hash: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
        message: 'Added new features.',
      }
    ]),
    description: 'Hello World',
    files: Promise.resolve([]),
    htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/1',
    id: 999000901,
    labels: ['enhancement', 'ui'],
    milestone: null,
    sourceBranch: {
      name: 'issue-1',
      isExists: Promise.resolve(true),
    },
    targetBranch: {
      name: 'main',
      isExists: Promise.resolve(true),
    },
    state: 'open',
    title: 'Awesome pull request',
    createdDate: new Date(2020, 9, 18, 12, 51, 0),
    statusInfo: Promise.resolve({
      merged: false,
      mergeable: true,
      mergeableState: 'clean',
      rebaseable: true,
    }),
  },
];
