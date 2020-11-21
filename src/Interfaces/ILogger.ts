export interface ILogger {

  /**
   * @deprecated Please use `info` instead.
   */
  log(message?: any, ...meta: Array<any>): void;

  info(message: string, ...meta: Array<any>): void;

  warning(message: string, ...meta: Array<any>): void;

  error(message: string, ...meta: Array<any>): void;

  debug(message: string, ...meta: Array<any>): void;

}
