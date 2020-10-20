import { expect } from 'chai';

import { WhenTargetBranchNameCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenTargetBranchNameCondition', () => {
  const context = new LabelerContext(pullRequests[0]);

  it('should return true if the branch name matches', (): void => {
    const when = new WhenTargetBranchNameCondition('main');

    expect(true).equal(when.test(context));
  });

  it('should return false if the branch name non-matches', (): void => {
    const when = new WhenTargetBranchNameCondition('main-2');

    expect(false).equal(when.test(context));
  });

});
