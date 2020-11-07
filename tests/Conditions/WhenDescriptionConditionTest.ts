import { expect } from 'chai';

import { WhenDescriptionCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('WhenDescriptionCondition', () => {
  const context = new LabelerContext({
    pullRequest: firstPullRequest,
    test: true,
  });

  it('should return true for the found substring in description', (): void => {
    const when = new WhenDescriptionCondition('World');

    expect(when.test(context)).to.be.true;
  });

  it('should return false when the specified substring is not found in description', (): void => {
    const when = new WhenDescriptionCondition('abracadabra');

    expect(when.test(context)).to.be.false;
  });

});
