import { expect } from 'chai';

import { WhenCommitMessageCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenCommitMessageCondition', () => {
  const context = new LabelerContext(pullRequests[0], true);

  it('should return true when the specified substring is found in commit messages', async(): Promise<void> => {
    const when = new WhenCommitMessageCondition('bug');
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false when the specified substring is not found in commit messages', async(): Promise<void> => {
    const when = new WhenCommitMessageCondition('abracadabra');
    const result = await when.test(context);

    expect(result).to.be.false;
  });

});
