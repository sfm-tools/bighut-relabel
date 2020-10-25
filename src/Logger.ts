import { IBufferable, ILogger } from './Interfaces';

export class Logger implements IBufferable, ILogger {

  private readonly _buffer = new Array<{ (): void }>();

  constructor() {
    this.log = this.log.bind(this);
    this.flush = this.flush.bind(this);
  }

  public log(message?: any, ...optionalParams: any[]): void {
    this._buffer.push((): void => console.log(message, ...optionalParams));
  }

  public flush(): void {
    this._buffer.forEach((log: { (): void }): void => log());
    this._buffer.splice(0, this._buffer.length);
  }

}
