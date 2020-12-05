import { expect } from 'chai';

import { WhenContainsRequestsToReviewConditionOptions } from '../../src/ConditionOptions';
import { WhenContainsRequestsToReviewCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest, flossMotUser, loftSomsUser, msSoftLoUser, noReviewPullRequest } from '../Resources';

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
    const options = new WhenContainsRequestsToReviewConditionOptions(null);
    const when = new WhenContainsRequestsToReviewCondition(true, options);

    options.nothing();

    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });
    const result = when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for a pull request that contains requests to one of the reviewers when reviewers are expected', (): void => {
    const options = new WhenContainsRequestsToReviewConditionOptions(null);
    const when = new WhenContainsRequestsToReviewCondition(true, options);
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });

    options.oneOf([
      flossMotUser.login,
      loftSomsUser.login,
    ]);

    const result = when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a pull request that no contains requests to a specific one of the reviewers when reviewers are expected', (): void => {
    const options = new WhenContainsRequestsToReviewConditionOptions(null);
    const when = new WhenContainsRequestsToReviewCondition(true, options);
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    options.oneOf([
      flossMotUser.login,
    ]);

    const result = when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for a pull request that contains requests to specific reviewers when reviewers are expected', (): void => {
    const options = new WhenContainsRequestsToReviewConditionOptions(null);
    const when = new WhenContainsRequestsToReviewCondition(true, options);
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });

    options.all([
      flossMotUser.login,
      loftSomsUser.login,
    ]);

    const result = when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a pull request that contains requests to specific reviewers when reviewers are expected and one is missing', (): void => {
    const options = new WhenContainsRequestsToReviewConditionOptions(null);
    const when = new WhenContainsRequestsToReviewCondition(true, options);
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });

    options.all([
      flossMotUser.login,
      msSoftLoUser.login,
    ]);

    const result = when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for a pull request that contains requests to specific reviewers when reviewers are expected and one is missing with the "nothing" option', (): void => {
    const options = new WhenContainsRequestsToReviewConditionOptions(null);
    const when = new WhenContainsRequestsToReviewCondition(true, options);
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });

    options.all([
      flossMotUser.login,
      msSoftLoUser.login,
    ]);

    options.nothing();

    const result = when.test(context);

    expect(result).to.be.true;
  });

});
