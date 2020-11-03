import { PullRequest } from './ApiProviders';
import { ICache, ILogger } from './Interfaces';
import { Logger } from './Logger';
import { LabelerContextOptions } from './Types';
import { Updater } from './Updater';

export class LabelerContext {

  private _stop: boolean = false;

  private _stopComments: string = null;

  public readonly logger: ILogger = new Logger();

  private readonly _options: LabelerContextOptions;

  /**
   * Current Pull Request.
   */
  public get pullRequest(): PullRequest {
    return this._options.pullRequest;
  }

  /**
   * Represents access to `Labeler` cache.
   */
  public get cache(): ICache {
    return this._options.cache;
  }

  /**
   * Indicates what is running in test mode.
   */
  public get testMode(): boolean {
    return this._options.test || false;
  }

  /**
   * Indicates to interrupt the processing of other actions
   * for the current Pull Request.
   */
  public get stopped(): boolean {
    return this._stop;
  }

  /**
   * The reason for the stop.
   */
  public get stopComments(): string {
    return this._stopComments;
  }

  /**
   * Tasks to update the current Pull Request.
   */
  public readonly updater = new Updater();

  /**
   * The custom dataset used in the processing of the current Pull Request.
   * You can use this for whatever you need.
   */
  public readonly data = new Map<string, any>();

  constructor(options: LabelerContextOptions) {
    this._options = Object.assign(
      {},
      {
        test: false,
      },
      options
    );

    this.stop = this.stop.bind(this);
    this.log = this.log.bind(this);
  }

  /**
   * Stops processing at the next iteration.
   */
  public stop(comments?: string): void {
    this._stop = true;
    this._stopComments = comments;
  }

  public log(message?: any, ...optionalParams: Array<any>): void {
    this.logger.log(message, ...optionalParams);
  }

}
