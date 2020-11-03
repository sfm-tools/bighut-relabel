import { expect } from 'chai';

import { WhenMergeDirectionCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenMergeDirectionCondition', () => {
  const context = new LabelerContext({
    pullRequest: pullRequests[0],
    test: true,
  });

  it('should return true for the matched direction of the merge', (): void => {
    const when = new WhenMergeDirectionCondition([
      {
        from: 'issue-1',
        to: 'main',
      }
    ]);

    expect(when.test(context)).to.be.true;
  });

  it('should return false for the non-matched direction of the merge', (): void => {
    const when = new WhenMergeDirectionCondition([
      {
        from: 'issue-123',
        to: 'main-main',
      },
      {
        from: 'main',
        to: 'issue-1',
      }
    ]);

    expect(when.test(context)).to.be.false;
  });

});
