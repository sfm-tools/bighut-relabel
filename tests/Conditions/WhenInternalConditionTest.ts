import { expect } from 'chai';

import { WhenInternalConditionOptions } from '../../src/ConditionOptions';
import { WhenInternalCondition } from '../../src/Conditions';
import { NotSupportedParameterError } from '../../src/Errors';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('WhenInternalCondition', () => {

  it('should be enabled the stopped option in the context instance', (): void => {
    const options = new WhenInternalConditionOptions(null);
    const when = new WhenInternalCondition(options);
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    options.ignoreOtherActions();

    when.test(context);

    expect(context.stopped).to.be.true;
  });

  it('should not be enabled the stopped option in the context instance', (): void => {
    const options = new WhenInternalConditionOptions(null);
    const when = new WhenInternalCondition(options);
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    when.test(context);

    expect(context.stopped).to.be.false;
  });

  it('an exception should be thrown', (): void => {
    const options = new WhenInternalConditionOptions(null);
    const when = new WhenInternalCondition(options);

    options.nothing();

    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    expect(() => when.test(context)).to.throw(new NotSupportedParameterError('nothing').message);
  });

});
