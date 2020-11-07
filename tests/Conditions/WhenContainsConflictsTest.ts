import { expect, should, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { DefaultConditionOptions } from '../../src/ConditionOptions';
import { WhenContainsConflicts } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest, secondPullRequests } from '../Resources';

use(chaiAsPromised);
should();

describe('WhenContainsConflicts', () => {

  it('should return true for a pull request that does not contain conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(false);
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a pull request that does not contain conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(true);
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });
    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for a pull request that contains conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(true);
    const context = new LabelerContext({
      pullRequest: secondPullRequests,
      test: true,
    });
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a pull request that contains conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(false);
    const context = new LabelerContext({
      pullRequest: secondPullRequests,
      test: true,
    });
    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return false for a pull request that contains conflicts', async(): Promise<void> => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenContainsConflicts(true, options);

    options.nothing();

    const context = new LabelerContext({
      pullRequest: secondPullRequests,
      test: true,
    });
    const result = await when.test(context);

    expect(result).to.be.false;
  });

});
