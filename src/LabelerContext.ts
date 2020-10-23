import { PullRequest } from './GitHubClient';
import { Updater } from './Updater';

export class LabelerContext {

  private _stop: boolean = false;

  /**
   * Indicates to interrupt the processing of other actions
   * for the current Pull Request.
   */
  public get stopped(): boolean {
    return this._stop;
  }

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
  public readonly data = new Map<string, any>();

  constructor(pullRequest: PullRequest) {
    this.pullRequest = pullRequest;
  }

  /**
   * Stops processing at the next iteration.
   */
  public stop(): void {
    this._stop = true;
  }

}
