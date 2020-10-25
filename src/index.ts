import { Config } from './Config';
import { GitHubClient } from './GitHubClient';
import { IConfig } from './Interfaces';
import { Labeler } from './Labeler';

type Options = {

  /**
   * Pull Requests processing config.
   *
   * Use `create()` function to create a new config.
   */
  config: IConfig;

  /**
   * Username or organization name.
   *
   * @example
   * https://github.com/sfm-tools/bighut-relabel
   *                    ^^^^^^^^  ^^^^^^^^^^^^^^
   *                    owner     repo
   */
  owner: string;

  /**
   * Repository name.
   *
   * @example
   * https://github.com/sfm-tools/bighut-relabel
   *                    ^^^^^^^^  ^^^^^^^^^^^^^^
   *                    owner     repo
   */
  repo: string;

  /**
   * GitHub access token.
   *
   * @see https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token
   */
  token: string;

};

/**
 * Creates a new config.
 */
export function create(): IConfig {
  return new Config();
}

/**
 * Applies the specified configuration to the specified repository.
 */
export function fix(options: Options): Promise<void> {
  return run(options, false);
}

/**
 * Tests the specified configuration without taking any action to modify the repository.
 */
export function test(options: Options): Promise<void> {
  return run(options, true);
}

function run(options: Options, test: boolean): Promise<void> {
  const {
    config,
    owner,
    repo,
    token,
  } = options;

  const labeler = new Labeler(
    config,
    new GitHubClient(token, owner, repo)
  );

  return test
    ? labeler.test()
    : labeler.fix();
}
