import { GitHubLabeler } from './GitHubLabeler';
import fs from 'fs';

type Auth = { token: string, user: string, repo: string };
const auth: Auth = JSON.parse(fs.readFileSync('.auth.json', 'utf8'));

const labeler = new GitHubLabeler(
  auth.token,
  auth.user,
  auth.repo
);

if (process.argv.includes('--test')) {
  labeler.test();
} else {
  console.log(`Checking and fixing Pull Requests of ${labeler.repoName}...`);

  setTimeout(() => {
    labeler.execute();
  }, 5000);
}
