export class CacheableAction<TResult> {

  private readonly _action: { (): Promise<TResult> };

  private _result: TResult = undefined;

  constructor(action: { (): Promise<TResult> }) {
    this._action = action;
  }

  /**
   * Executes the action once, store the result, and returns the stored result.
   */
  public async get(): Promise<TResult> {
    if (this._result === undefined) {
      this._result = await this._action();
    }

    return this._result;
  }

}
