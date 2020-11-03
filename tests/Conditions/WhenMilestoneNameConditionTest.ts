import { expect } from 'chai';

import { WhenMilestoneNameCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenMilestoneNameCondition', () => {

  it('should return true for milestone matching name', (): void => {
    const context = new LabelerContext({
      pullRequest: pullRequests[1],
      test: true,
    });
    const when = new WhenMilestoneNameCondition('Version 2.0');

    expect(when.test(context)).to.be.true;
  });

  it('should return false for milestone non-matching name', (): void => {
    const context = new LabelerContext({
      pullRequest: pullRequests[1],
      test: true,
    });
    const when = new WhenMilestoneNameCondition('Version 3.0');

    expect(when.test(context)).to.be.false;
  });

  it('should return false when a milestone is null', (): void => {
    const context = new LabelerContext({
      pullRequest: pullRequests[0],
      test: true,
    });
    const when = new WhenMilestoneNameCondition('Version 2.0');

    expect(when.test(context)).to.be.false;
  });

});
