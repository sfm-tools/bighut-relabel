import { Comment, Commit, File, PullRequest } from '../../src/GitHubClient';
import { flossTomUser, loftMossUser, msSoftLoUser } from './Users';

export const pullRequests: Array<PullRequest> = [
  {
    author: flossTomUser,
    code: 1,
    comments: Promise.resolve<Array<Comment>>([
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
    ]),
    commits: Promise.resolve<Array<Commit>>([
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
    ]),
    description: 'Hello World',
    files: Promise.resolve<Array<File>>([
      {
        additions: 24,
        changes: 0,
        deletions: 0,
        status: 'added',
        filePath: 'Frontend/package.json',
        patch: undefined,
        content: Promise.resolve(`
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
        `),
      },
      {
        additions: 0,
        changes: 0,
        deletions: 72,
        status: 'removed',
        filePath: 'Frontend/webpack.js',
        patch: undefined,
        content: Promise.reject('404 File not found.'),
      },
      {
        additions: 9,
        changes: 0,
        deletions: 0,
        status: 'added',
        filePath: 'Frontend/AwesomeComponent.tsx',
        patch: undefined,
        content: Promise.resolve(`
        export class AwesomeComponent extends React.Component {

          render() {
            return (
              <div>Awesome Component</div>
            )
          }

        }
        `),
      },
      {
        additions: 4,
        changes: 0,
        deletions: 0,
        status: 'added',
        filePath: 'Frontend/Models/AwesomeModel.ts',
        patch: undefined,
        content: Promise.resolve(`
        export type AwesomeModel = {
          id: number;
          name: string;
        };
        `),
      },
      {
        additions: 4,
        changes: 0,
        deletions: 0,
        status: 'added',
        filePath: 'Frontend/Models/index.ts',
        patch: undefined,
        content: Promise.resolve(`
        export { AwesomeModel } from "./AwesomeModel";
        `),
      },
      {
        additions: 4,
        changes: 0,
        deletions: 0,
        status: 'added',
        filePath: 'Backend/Program.cs',
        patch: undefined,
        content: Promise.resolve(`
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
        `),
      },
      {
        additions: 115,
        changes: 0,
        deletions: 0,
        status: 'modified',
        filePath: 'Backend/Controllers/ValuesController.cs',
        patch: undefined,
        content: Promise.resolve(`
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
        `),
      },
    ]),
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
      changedFiles: 7,
      comments: 4,
      commits: 3,
    }),
  },
  {
    author: loftMossUser,
    code: 2,
    comments: Promise.resolve<Array<Comment>>([]),
    commits: Promise.resolve<Array<Commit>>([
      {
        author: loftMossUser,
        hash: '1121a3ee5e6b5b0d3255bfef95601890afd80701',
        message: 'Updated README.md',
      },
    ]),
    description: null,
    files: Promise.resolve<Array<File>>([
      {
        additions: 451324,
        changes: 1233324,
        deletions: 133,
        content: Promise.resolve('Awesome README'),
        filePath: 'README.md',
        patch: null,
        status: 'modified',
      },
    ]),
    htmlUrl: 'https://github.com/sfm-tools/bighut-relabel/pulls/2',
    id: 999000902,
    labels: [],
    milestone: null,
    sourceBranch: {
      name: 'issue-2',
      isExists: Promise.resolve(true),
    },
    targetBranch: {
      name: 'main',
      isExists: Promise.resolve(true),
    },
    state: 'open',
    title: 'Readme fixes',
    createdDate: new Date(2020, 9, 24, 0, 30, 0),
    statusInfo: Promise.resolve({
      merged: false,
      mergeable: true,
      mergeableState: 'dirty',
      rebaseable: true,
      changedFiles: 1,
      comments: 0,
      commits: 1,
    }),
  }
];
