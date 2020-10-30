import { PullRequest } from '../ApiProviders';

export type LabelerOptions = {

  /**
   * The number of jobs processed in parallel. Default: 3.
   */
  threads?: number;

  /**
   * The number of Pull Requests to process. Default: 100.
   */
  limit?: number;

  /**
   * A function for checking the ability to process a Pull Request.
   * Can be used for debugging.
   */
  test?: (pullRequest: PullRequest) => boolean;

  /**
   * Warn about exceeding the number of API requests.
   * Limit: 5000 requests per hour.
   * You can specify any number within the given range.
   * Default: no warns.
   */
  rateLimitNotify?: number;

};
