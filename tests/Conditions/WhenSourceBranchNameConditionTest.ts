import { expect } from 'chai';

import { WhenSourceBranchNameCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('WhenSourceBranchNameCondition', () => {
  const context = new LabelerContext({
    pullRequest: firstPullRequest,
    test: true,
  });

  it('should return true if the branch name matches', (): void => {
    const when = new WhenSourceBranchNameCondition('issue-1');

    expect(when.test(context)).to.be.true;
  });

  it('should return false if the branch name non-matches', (): void => {
    const when = new WhenSourceBranchNameCondition('issue-123');

    expect(when.test(context)).to.be.false;
  });

});
