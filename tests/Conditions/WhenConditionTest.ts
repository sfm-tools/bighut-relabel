import { expect } from 'chai';

import { DefaultConditionOptions } from '../../src/ConditionOptions';
import { WhenCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenCondition', () => {

  it('test of true predicate result should return true', (): void => {
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !!context.pullRequest;
    });

    const context = new LabelerContext(pullRequests[0], true);

    expect(when.test(context)).to.be.true;
  });

  it('test of false predicate result should return false', (): void => {
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !context.pullRequest;
    });

    const context = new LabelerContext(pullRequests[0], true);

    expect(when.test(context)).to.be.false;
  });

  it('test of true predicate using the "nothing" option should return false', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !!context.pullRequest;
    }, options);

    options.nothing();

    const context = new LabelerContext(pullRequests[0], true);

    expect(when.test(context)).to.be.false;
  });

  it('test of false predicate using the "nothing" option should return true', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !context.pullRequest;
    }, options);

    options.nothing();

    const context = new LabelerContext(pullRequests[0], true);

    expect(when.test(context)).to.be.true;
  });

});
