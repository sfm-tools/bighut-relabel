import { expect } from 'chai';
import streams from 'memory-streams';
import winston from 'winston';

import { Logger } from '../src/Logger';

describe('Logger', () => {

  it('should contain info item', (): void => {
    const writer = new streams.WritableStream();
    const logger = new Logger({
      levels: Logger.defaultLevels,
      level: 'info',
      transports: [
        new winston.transports.Stream({
          stream: writer,
        }),
      ],
    });

    logger.info('info');
    logger.flush();

    expect(JSON.parse(writer.toString()))
      .to.be.deep.equal({
        message: 'info',
        level: 'info'
      });
  });

  it('should contain action item', (): void => {
    const writer = new streams.WritableStream();
    const logger = new Logger({
      levels: Logger.defaultLevels,
      level: 'info',
      transports: [
        new winston.transports.Stream({
          stream: writer,
        }),
      ],
    });

    logger.action('some action');
    logger.flush();

    expect(JSON.parse(writer.toString()))
      .to.be.deep.equal({
        message: 'some action',
        level: 'action'
      });
  });

  it('should contain warning item', (): void => {
    const writer = new streams.WritableStream();
    const logger = new Logger({
      levels: Logger.defaultLevels,
      level: 'info',
      transports: [
        new winston.transports.Stream({
          stream: writer,
        }),
      ],
    });

    logger.warning('some warning');
    logger.flush();

    expect(JSON.parse(writer.toString()))
      .to.be.deep.equal({
        message: 'some warning',
        level: 'warning'
      });
  });

  it('should contain error item', (): void => {
    const writer = new streams.WritableStream();
    const logger = new Logger({
      levels: Logger.defaultLevels,
      level: 'info',
      transports: [
        new winston.transports.Stream({
          stream: writer,
        }),
      ],
    });

    logger.error('some error');
    logger.flush();

    expect(JSON.parse(writer.toString()))
      .to.be.deep.equal({
        message: 'some error',
        level: 'error'
      });
  });

  it('should remain empty when adding "info" entry when the level is "action"', (): void => {
    const writer = new streams.WritableStream();
    const logger = new Logger({
      levels: Logger.defaultLevels,
      level: 'action',
      transports: [
        new winston.transports.Stream({
          stream: writer,
        }),
      ],
    });

    logger.info('some info');
    logger.flush();

    expect(writer.toString()).to.be.equal('');
  });

});
