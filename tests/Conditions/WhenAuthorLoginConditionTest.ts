import { expect } from 'chai';

import { WhenAuthorLoginCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('WhenAuthorLoginCondition', () => {
  const context = new LabelerContext({
    pullRequest: firstPullRequest,
    test: true,
  });

  it('should return true if the login of the author of the pull request matches', (): void => {
    const when = new WhenAuthorLoginCondition('floss.tom');

    expect(when.test(context)).to.be.true;
  });

  it('should return false if the login of the author of the pull request non-matches', (): void => {
    const when = new WhenAuthorLoginCondition('loft-moss');

    expect(when.test(context)).to.be.false;
  });

});
