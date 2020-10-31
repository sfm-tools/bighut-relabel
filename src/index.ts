import { Auth, GitHubClient } from './ApiProviders';
import { IConfig } from './Interfaces';
import { Labeler } from './Labeler';
import { LabelerOptions } from './Types';

export { IConfig } from './Interfaces';
export { LabelerContext } from './LabelerContext';
export { TaskContext } from './Types';

type Options = {

  /**
   * Pull Requests processing config.
   *
   * Use `create()` function to create a new config.
   */
  config: IConfig;

  /**
   * Information for accessing the GitHub repository.
   */
  auth: Auth;

  /**
   * Additional options.
   */
  options?: LabelerOptions;

};

export { createConfig } from './Config';

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
    auth,
    options: labelerOptions,
  } = options;

  const labeler = new Labeler(
    config,
    new GitHubClient(auth),
    labelerOptions
  );

  return test
    ? labeler.test()
    : labeler.fix();
}
