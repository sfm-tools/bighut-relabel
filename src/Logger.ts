import stringFomat from 'string-format';
import winston, { format, Logger as WinstonLogger, LoggerOptions } from 'winston';

import { IBufferable, ILogger } from './Interfaces';

export class Logger implements IBufferable, ILogger {

  private readonly _buffer = new Array<{ (): void }>();

  private readonly _logger: WinstonLogger;

  constructor(options?: LoggerOptions) {
    this.log = this.log.bind(this);
    this.info = this.info.bind(this);
    this.warning = this.warning.bind(this);
    this.error = this.error.bind(this);
    this.debug = this.debug.bind(this);
    this.flush = this.flush.bind(this);

    if (!options) {
      options = {
        level: 'info',
        format: format.combine(
          format.timestamp(),
          format.printf(info => `${info.timestamp} ${info.level}: ${stringFomat(info.message, info)}`),
        ),
        transports: [
          new winston.transports.Console(),
        ],
      };
    }

    this._logger = winston.createLogger(options);
  }

  public log(message?: any, ...meta: Array<any>): void {
    this.info(message, ...meta);
  }

  public info(message: string, ...meta: Array<any>): void {
    this._buffer.push((): void => {
      this._logger.info(message, ...meta);
    });
  }

  public warning(message: string, ...meta: Array<any>): void {
    this._buffer.push((): void => {
      this._logger.warning(message, ...meta);
    });
  }

  public error(message: string, ...meta: Array<any>): void {
    this._buffer.push((): void => {
      this._logger.error(message, ...meta);
    });
  }

  public debug(message: string, ...meta: Array<any>): void {
    this._buffer.push((): void => {
      this._logger.debug(message, ...meta);
    });
  }

  public flush(): void {
    this._buffer.forEach((write: { (): void }): void => write());
    this._buffer.splice(0, this._buffer.length);
  }

}
