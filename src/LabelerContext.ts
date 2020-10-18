import { PullRequest } from './GitHubClient';
import { Updater } from './Updater';

export class LabelerContext {

  /**
   * Current Pull Request.
   */
  public readonly pullRequest: PullRequest;

  /**
   * Tasks to update the current Pull Request.
   */
  public readonly updater = new Updater();

  /**
   * The custom dataset used in the processing of the current Pull Request.
   * You can use this for whatever you need.
   */
  public readonly data: Map<string, any>;

  constructor(pullRequest: PullRequest) {
    this.pullRequest = pullRequest;
  }

}
