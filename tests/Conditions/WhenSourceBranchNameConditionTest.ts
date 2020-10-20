import { expect } from 'chai';

import { WhenSourceBranchNameCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenSourceBranchNameCondition', () => {
  const context = new LabelerContext(pullRequests[0]);

  it('should return true if the branch name matches', (): void => {
    const when = new WhenSourceBranchNameCondition('issue-1');

    expect(true).equal(when.test(context));
  });

  it('should return false if the branch name non-matches', (): void => {
    const when = new WhenSourceBranchNameCondition('issue-123');

    expect(false).equal(when.test(context));
  });

});
