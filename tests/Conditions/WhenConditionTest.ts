import { expect } from 'chai';

import { DefaultConditionOptions } from '../../src/ConditionOptions';
import { WhenCondition } from '../../src/Conditions';
import { NotSupportedParameterError } from '../../src/Errors';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenCondition', () => {

  it('should always return true', (): void => {
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !!context.pullRequest;
    });

    const context = new LabelerContext(pullRequests[0]);

    expect(true).to.equal(when.test(context));
  });

  it('an exception should be thrown', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !!context.pullRequest;
    }, options);

    options.noOne();

    const context = new LabelerContext(pullRequests[0]);

    expect(() => when.test(context)).to.throw(new NotSupportedParameterError('noOne').message);
  });

});
