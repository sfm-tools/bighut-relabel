import { Auth, GitHubClient, IApiProviderClient } from './ApiProviders';
import { IConfig } from './Interfaces';
import { Labeler } from './Labeler';
import { LabelerOptions } from './Types';

export { IConfig } from './Interfaces';
export { LabelerContext } from './LabelerContext';
export { TaskContext } from './Types'; // TODO: Remove in future releases

type BaseRepositoryOptions = {

  /**
   * Pull Requests processing config.
   *
   * Use `create()` function to create a new config.
   */
  config: IConfig;

  /**
   * Additional options.
   */
  options?: LabelerOptions;

};

type DefaultRepositoryOptions = BaseRepositoryOptions & {

  /**
   * Information for accessing the GitHub repository.
   */
  auth: Auth;

  /**
   * Allows to specify a custom API client instance.
   */
  client?: undefined;

};

type CustomRepositoryOptions = BaseRepositoryOptions & {

  /**
   * Information for accessing the GitHub repository.
   */
  auth?: undefined;

  /**
   * Allows to specify a custom API client instance.
   */
  client: IApiProviderClient;

};

export type RepositoryOptions = DefaultRepositoryOptions | CustomRepositoryOptions;

export { createConfig } from './Config';

/**
 * Applies the specified configuration to the specified repository.
 */
export function fix(options: RepositoryOptions): Promise<void> {
  return run(options, false);
}

/**
 * Tests the specified configuration without taking any action to modify the repository.
 */
export function test(options: RepositoryOptions): Promise<void> {
  return run(options, true);
}

function run(options: RepositoryOptions, test: boolean): Promise<void> {
  const {
    config,
    auth,
    options: labelerOptions,
    client,
  } = options;

  const labeler = new Labeler(
    config,
    client || new GitHubClient(auth),
    labelerOptions
  );

  return test
    ? labeler.test()
    : labeler.fix();
}
