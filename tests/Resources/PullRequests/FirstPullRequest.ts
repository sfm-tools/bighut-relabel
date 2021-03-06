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
import { flossTomUser, loftMossUser, msSoftLoUser } from '../Users';

export const firstPullRequest: PullRequest = {
  author: flossTomUser,
  code: 1,
  comments: new CacheableAction(() => Promise.resolve<Array<Comment>>([
    {
      id: 1,
      author: msSoftLoUser,
      text: 'Nothing works!',
      createdDate: new Date(2020, 9, 20),
    },
    {
      id: 2,
      author: loftMossUser,
      text: 'Well done! Everything works great! @ms.softlo just **format** your drive and reinstall your system!',
      createdDate: new Date(2020, 9, 21),
    },
    {
      id: 3,
      author: msSoftLoUser,
      text: '@loft-moss thanks it really helped!',
      createdDate: new Date(2020, 9, 22),
    },
    {
      id: 5,
      author: flossTomUser,
      text: '**Thanks, everyone!** _I hope someone will someday approve of this PR and I can merge it into the main branch._',
      createdDate: new Date(2020, 9, 23),
      updatedDate: new Date(2020, 9, 25),
    },
  ])),
  commits: new CacheableAction(() => Promise.resolve<Array<Commit>>([
    {
      author: flossTomUser,
      hash: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
      message: 'Added new features.',
    },
    {
      author: flossTomUser,
      hash: '1a31a3ee5e4b4b0d3255b0efa56018d0af550709',
      message: 'Fixed awesome bug.',
    },
    {
      author: flossTomUser,
      hash: '2127cd8852b430ea586be97f82eb16c9d1ae2377',
      message: 'Merge branch "main" into "issue-1"',
    },
  ])),
  description: 'Hello World',
  files: new CacheableAction(() => Promise.resolve<Array<File>>([
    {
      additions: 24,
      changes: 0,
      deletions: 0,
      status: 'added',
      filePath: 'Frontend/package.json',
      patch: undefined,
      content: new CacheableAction(() => Promise.resolve(`
      {
        "name": "awesome-application",
        "version": "1.0.0",
        "description": "Awesome application.",
        "main": "index.js",
        "dependencies": {
        },
        "devDependencies": {
          "@types/chai": "4.2.14",
          "@types/mocha": "8.0.3",
          "@types/node": "14.0.27",
          "chai": "4.2.0",
          "mocha": "8.1.3",
          "nyc": "15.1.0",
          "ts-node": "9.0.0",
          "typescript": "3.9.7"
        },
        "scripts": {
          "start": "./node_modules/ts-node index.ts",
          "test": "mocha -r ts-node/register tests/*.ts tests/**/*.ts",
        },
      }
      `)),
    },
    {
      additions: 0,
      changes: 0,
      deletions: 72,
      status: 'removed',
      filePath: 'Frontend/webpack.js',
      patch: undefined,
      content: new CacheableAction(() => Promise.reject('404 File not found.')),
    },
    {
      additions: 9,
      changes: 0,
      deletions: 0,
      status: 'added',
      filePath: 'Frontend/AwesomeComponent.tsx',
      patch: undefined,
      content: new CacheableAction(() => Promise.resolve(`
      export class AwesomeComponent extends React.Component {

        render() {
          return (
            <div>Awesome Component</div>
          )
        }

      }
      `)),
    },
    {
      additions: 4,
      changes: 0,
      deletions: 0,
      status: 'added',
      filePath: 'Frontend/Models/AwesomeModel.ts',
      patch: undefined,
      content: new CacheableAction(() => Promise.resolve(`
      export type AwesomeModel = {
        id: number;
        name: string;
      };
      `)),
    },
    {
      additions: 4,
      changes: 0,
      deletions: 0,
      status: 'added',
      filePath: 'Frontend/Models/index.ts',
      patch: undefined,
      content: new CacheableAction(() => Promise.resolve(`
      export { AwesomeModel } from "./AwesomeModel";
      `)),
    },
    {
      additions: 4,
      changes: 0,
      deletions: 0,
      status: 'added',
      filePath: 'Backend/Program.cs',
      patch: undefined,
      content: new CacheableAction(() => Promise.resolve(`
      using System;
      using System.IO;
      using System.Threading.Tasks;
      using Autofac;

      namespace AwesomeBackend
      {
        public class Program
        {
          public static async Task Main(string[] args)
          {
          }
        }
      }
      `)),
    },
    {
      additions: 115,
      changes: 0,
      deletions: 0,
      status: 'modified',
      filePath: 'Backend/Controllers/ValuesController.cs',
      patch: undefined,
      content: new CacheableAction(() => Promise.resolve(`
      using System;
      using System.Threading.Tasks;
      using Microsoft.AspNetCore.Mvc;

      namespace AwesomeBackend.Controllers
      {
        public class ValuesController
        {
          [HttpGet]
          public ActionResult<IEnumerable<string>> Get()
          {
              return new[] { "value1", "value2", "value3" };
          }
        }
      }
      `)),
    },
    {
      additions: 42,
      changes: 0,
      deletions: 0,
      status: 'modified',
      filePath: 'Backend/Controllers/MessagesController.cs',
      patch: undefined,
      content: new CacheableAction(() => Promise.reject(new Error('404 File not found.'))),
    },
  ])),
  htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/1',
  id: 999000901,
  labels: ['enhancement', 'ui'],
  milestone: null,
  sourceBranch: issue1Branch,
  targetBranch: mainBranch,
  state: 'open',
  title: 'Awesome pull request',
  createdDate: new Date(2020, 9, 18, 12, 51, 0),
  requestedReviewers: [],
  reviews: new CacheableAction(() => Promise.resolve<Array<Review>>([
    {
      author: msSoftLoUser,
      comment: null,
      commintId: '2127cd8852b430ea586be97f82eb16c9d1ae2377',
      createdDate: new Date(2020, 10, 7, 5, 23, 0),
      state: 'APPROVED',
    },
    {
      author: msSoftLoUser,
      comment: null,
      commintId: '2127cd8852b430ea586be97f82eb16c9d1ae2377',
      createdDate: new Date(2020, 10, 7, 5, 23, 30),
      state: 'COMMENTED',
    },
  ])),
  statusInfo: new CacheableAction(() => Promise.resolve<PullRequestStatus>({
    merged: false,
    mergeable: true,
    mergeableState: 'clean',
    rebaseable: true,
    changedFiles: 8,
    comments: 4,
    commits: 3,
  })),
};
