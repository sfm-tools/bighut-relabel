import { expect } from 'chai';

import { WhenContainsConflicts } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenContainsConflicts', () => {

  it('should return true for a pull request that does not contain conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(false);
    const context = new LabelerContext(pullRequests[0]);
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a pull request that does not contain conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(true);
    const context = new LabelerContext(pullRequests[0]);
    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for a pull request that contains conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(true);
    const context = new LabelerContext(pullRequests[1]);
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a pull request that contains conflicts', async(): Promise<void> => {
    const when = new WhenContainsConflicts(false);
    const context = new LabelerContext(pullRequests[1]);
    const result = await when.test(context);

    expect(result).to.be.false;
  });

});
