import { Commit, File, PullRequest } from '../../src/GitHubClient';
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
    }),
  },
];
