import { PullRequest } from './ApiProviders';
import { ICache, ILogger } from './Interfaces';
import { Logger } from './Logger';
import { LabelerContextOptions } from './Types';
import { Updater } from './Updater';

export class LabelerContext {

  private _fixable: boolean = false;

  private _stop: boolean = false;

  private _stopComments: string = null;

  private readonly _options: LabelerContextOptions;

  /**
   * Current Pull Request.
   */
  public get pullRequest(): PullRequest {
    return this._options.pullRequest;
  }

  /**
   * Represents context logger.
   */
  public get logger(): ILogger {
    return this._options.logger;
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
   * Indicates that there are some changes that can be made in fix mode.
   * Affects caching if caching is enabled.
   */
  public get fixable(): boolean {
    return this._fixable;
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
    this._options = Object.assign<Partial<LabelerContextOptions>, Partial<LabelerContextOptions>, LabelerContextOptions>(
      {},
      {
        logger: new Logger(),
        test: false,
      },
      options
    );

    this.haveToFix = this.haveToFix.bind(this);
    this.stop = this.stop.bind(this);
    this.log = this.log.bind(this);
  }

  /**
   * Notifies the Labeler that there are fixes for the given
   * Pull Request that can be performed in fix mode.
   *
   * This method is for use with `ExecuteAction`.
   * If you are using caching, then inside a custom action
   * you can call this method so that in test mode the correct status
   * is written to the cache, which will allow you to execute the action
   * in fix mode without waiting for the cache to expire.
   */
  public haveToFix(): void {
    this._fixable = true;
  }

  /**
   * Stops processing at the next iteration.
   */
  public stop(comments?: string): void {
    this._stop = true;
    this._stopComments = comments;
  }

  /**
   * @deprecated Please use `logger` instead.
   */
  public log(message?: any, ...optionalParams: Array<any>): void {
    this.logger.log(message, ...optionalParams);
  }

}
