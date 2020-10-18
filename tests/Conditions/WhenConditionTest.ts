import { expect } from 'chai';

import { WhenCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenCondition', () => {

  it('should always return true', (): void => {
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !!context.pullRequest;
    });

    const context = new LabelerContext(pullRequests[0]);

    expect(true).equal(when.test(context));
  });

});
