import { expect } from 'chai';

import { DefaultConditionOptions } from '../../src/ConditionOptions';
import { WhenContainsRequestsToReviewCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest, noReviewPullRequest } from '../Resources';

describe('WhenContainsRequestsToReviewCondition', () => {

  it('should return true for a pull request that contains requests to reviewers when reviewers are expected', (): void => {
    const when = new WhenContainsRequestsToReviewCondition(true);
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });
    const result = when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a pull request that not contains requests to reviewers when reviewers are expected', (): void => {
    const when = new WhenContainsRequestsToReviewCondition(true);
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });
    const result = when.test(context);

    expect(result).to.be.false;
  });

  it('should return false for a pull request that contains requests to reviewers when no reviewers are expected', (): void => {
    const when = new WhenContainsRequestsToReviewCondition(false);
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });
    const result = when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for a pull request that contains requests to reviewers when reviewers are expected and used the "nothing" option', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenContainsRequestsToReviewCondition(true, options);

    options.nothing();

    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });
    const result = when.test(context);

    expect(result).to.be.false;
  });

});
