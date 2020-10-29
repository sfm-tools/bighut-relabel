import { expect } from 'chai';

import { WhenTargetBranchNameCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenTargetBranchNameCondition', () => {
  const context = new LabelerContext(pullRequests[0], true);

  it('should return true if the branch name matches', (): void => {
    const when = new WhenTargetBranchNameCondition('main');

    expect(when.test(context)).to.be.true;
  });

  it('should return false if the branch name non-matches', (): void => {
    const when = new WhenTargetBranchNameCondition('main-2');

    expect(when.test(context)).to.be.false;
  });

});
