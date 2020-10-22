import { expect } from 'chai';

import { WhenAuthorLoginCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenAuthorLoginCondition', () => {
  const context = new LabelerContext(pullRequests[0]);

  it('should return true if the login of the author of the pull request matches', (): void => {
    const when = new WhenAuthorLoginCondition('floss.tom');

    expect(true).equal(when.test(context));
  });

  it('should return false if the login of the author of the pull request non-matches', (): void => {
    const when = new WhenAuthorLoginCondition('loft-moss');

    expect(false).equal(when.test(context));
  });

});