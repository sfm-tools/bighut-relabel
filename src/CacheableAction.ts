export class CacheableAction<TResult> {

  private readonly _action: { (): Promise<TResult> };

  private _result: TResult = undefined;

  constructor(action: { (): Promise<TResult> }) {
    this._action = action;
  }

  public async execute(): Promise<TResult> {
    if (this._result === undefined) {
      this._result = await this._action();
    }

    return this._result;
  }

}
