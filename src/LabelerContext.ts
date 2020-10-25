import { PullRequest } from './GitHubClient';
import { ILogger } from './Interfaces';
import { Logger } from './Logger';
import { Updater } from './Updater';

export class LabelerContext {

  private _stop: boolean = false;

  public readonly logger: ILogger = new Logger();

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

    this.stop = this.stop.bind(this);
    this.log = this.log.bind(this);
  }

  /**
   * Stops processing at the next iteration.
   */
  public stop(): void {
    this._stop = true;
  }

  public log(message?: any, ...optionalParams: Array<any>): void {
    this.logger.log(message, ...optionalParams);
  }

}
