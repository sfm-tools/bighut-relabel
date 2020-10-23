import { expect, should, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { DefaultConditionOptions } from '../../src/ConditionOptions';
import { WhenContainsConflicts } from '../../src/Conditions';
import { NotSupportedParameterError } from '../../src/Errors';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

use(chaiAsPromised);
should();

describe('WhenContainsConflicts', () => {

  it('should return true for a pull request that does not contain conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(false);
    const context = new LabelerContext(pullRequests[0]);
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a pull request that does not contain conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(true);
    const context = new LabelerContext(pullRequests[0]);
    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for a pull request that contains conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(true);
    const context = new LabelerContext(pullRequests[1]);
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a pull request that contains conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(false);
    const context = new LabelerContext(pullRequests[1]);
    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('an exception should be thrown', () => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenContainsConflicts(true, options);

    options.noOne();

    const context = new LabelerContext(pullRequests[0]);

    return when.test(context).should.be.rejectedWith(new NotSupportedParameterError('noOne').message);
  });

});