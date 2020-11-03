import { expect } from 'chai';

import { WhenTitleCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenTitleCondition', () => {
  const context = new LabelerContext({
    pullRequest: pullRequests[0],
    test: true,
  });

  it('should return true for a fully matched title', (): void => {
    const when = new WhenTitleCondition('Awesome pull request');

    expect(when.test(context)).to.be.true;
  });

  it('should return true for the found substring in title', (): void => {
    const when = new WhenTitleCondition('pull');

    expect(when.test(context)).to.be.true;
  });

  it('should return false when the specified substring is not found in a title', (): void => {
    const when = new WhenTitleCondition('abracadabra');

    expect(when.test(context)).to.be.false;
  });

});
