import { expect } from 'chai';

import { WhenReviewStateConditionOptions } from '../../src/ConditionOptions';
import { WhenReviewStateCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import {
  approvedSimplePullRequest,
  changesRequestedSimplePullRequest,
  flossMotUser,
  flossTomUser,
  loftMossUser,
  loftSomsUser,
  msSoftLoUser,
  noReviewPullRequest,
  partialApprovedAndCommentedPullRequest,
} from '../Resources';

describe('WhenReviewStateCondition', () => {

  describe('No Review state', () => {
    it('should return true for pull request without any review', async(): Promise<void> => {
      const when = new WhenReviewStateCondition('NO_REVIEW');
      const context = new LabelerContext({
        pullRequest: noReviewPullRequest,
        test: true,
      });
      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false for a reviewed pull request', async(): Promise<void> => {
      const when = new WhenReviewStateCondition('NO_REVIEW');
      const context = new LabelerContext({
        pullRequest: approvedSimplePullRequest,
        test: true,
      });
      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('Approved state', () => {
    it('should return true for an approved pull request', async(): Promise<void> => {
      const when = new WhenReviewStateCondition('APPROVED');
      const context = new LabelerContext({
        pullRequest: approvedSimplePullRequest,
        test: true,
      });
      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true for an approved pull request by all specified users', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('APPROVED', options);
      const context = new LabelerContext({
        pullRequest: approvedSimplePullRequest,
        test: true,
      });

      options.all([
        msSoftLoUser.login,
      ]);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false for an approved pull request with the nothing option', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('APPROVED', options);
      const context = new LabelerContext({
        pullRequest: approvedSimplePullRequest,
        test: true,
      });

      options.nothing();

      const result = await when.test(context);

      expect(result).to.be.false;
    });

    it('should return false for a pull request with a "changes required" state', async(): Promise<void> => {
      const when = new WhenReviewStateCondition('APPROVED');
      const context = new LabelerContext({
        pullRequest: changesRequestedSimplePullRequest,
        test: true,
      });
      const result = await when.test(context);

      expect(result).to.be.false;
    });

    it('should return false for a pull request with state "approved" and "changes required"', async(): Promise<void> => {
      const when = new WhenReviewStateCondition('APPROVED');
      const context = new LabelerContext({
        pullRequest: partialApprovedAndCommentedPullRequest,
        test: true,
      });
      const result = await when.test(context);

      expect(result).to.be.false;
    });

    it('should return true for a pull request approved by specified user and not approved by another', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('APPROVED', options);
      const context = new LabelerContext({
        pullRequest: partialApprovedAndCommentedPullRequest,
        test: true,
      });

      options.oneOf([loftSomsUser.login]);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false for a pull request with a "changes required" state and non-approved by specified user', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('APPROVED', options);
      const context = new LabelerContext({
        pullRequest: partialApprovedAndCommentedPullRequest,
        test: true,
      });

      options.oneOf([flossTomUser.login]);

      const result = await when.test(context);

      expect(result).to.be.false;
    });

    it('should return false for a pull request with a "approved" state and non-approved by specified user', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('APPROVED', options);
      const context = new LabelerContext({
        pullRequest: approvedSimplePullRequest,
        test: true,
      });

      options.oneOf([
        loftSomsUser.login,
        flossTomUser.login,
        flossMotUser.login,
      ]);

      const result = await when.test(context);

      expect(result).to.be.false;
    });

    it('should return true for a pull request approved by all specified users and not approved by another', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('APPROVED', options);
      const context = new LabelerContext({
        pullRequest: partialApprovedAndCommentedPullRequest,
        test: true,
      });

      options.all([
        loftSomsUser.login,
        flossMotUser.login,
      ]);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false for a pull request approved by all specified users and not approved by another with the nothing option', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('APPROVED', options);
      const context = new LabelerContext({
        pullRequest: partialApprovedAndCommentedPullRequest,
        test: true,
      });

      options
        .all([
          loftSomsUser.login,
          flossMotUser.login,
        ])
        .nothing();

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('Changes Required state', () => {
    it('should return true for a pull request with a "changes required" state', async(): Promise<void> => {
      const when = new WhenReviewStateCondition('CHANGES_REQUESTED');
      const context = new LabelerContext({
        pullRequest: changesRequestedSimplePullRequest,
        test: true,
      });
      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false for a pull request with a "changes required" state and the nothing option', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('CHANGES_REQUESTED', options);
      const context = new LabelerContext({
        pullRequest: changesRequestedSimplePullRequest,
        test: true,
      });

      options.nothing();

      const result = await when.test(context);

      expect(result).to.be.false;
    });

    it('should return false for an approved pull request', async(): Promise<void> => {
      const when = new WhenReviewStateCondition('CHANGES_REQUESTED');
      const context = new LabelerContext({
        pullRequest: approvedSimplePullRequest,
        test: true,
      });
      const result = await when.test(context);

      expect(result).to.be.false;
    });

    it('should return false for no reviewed pull request', async(): Promise<void> => {
      const when = new WhenReviewStateCondition('CHANGES_REQUESTED');
      const context = new LabelerContext({
        pullRequest: noReviewPullRequest,
        test: true,
      });
      const result = await when.test(context);

      expect(result).to.be.false;
    });

    it('should return true for a pull request if one of the users is requesting a change and the others have approved the pull request', async(): Promise<void> => {
      const when = new WhenReviewStateCondition('CHANGES_REQUESTED');
      const context = new LabelerContext({
        pullRequest: partialApprovedAndCommentedPullRequest,
        test: true,
      });
      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true for a pull request when all specified users have requested changes', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('CHANGES_REQUESTED', options);
      const context = new LabelerContext({
        pullRequest: partialApprovedAndCommentedPullRequest,
        test: true,
      });

      options.all([
        flossTomUser.login,
        loftMossUser.login,
      ]);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false for a pull request when non-all specified users have requested changes', async(): Promise<void> => {
      const options = new WhenReviewStateConditionOptions(null);
      const when = new WhenReviewStateCondition('CHANGES_REQUESTED', options);
      const context = new LabelerContext({
        pullRequest: partialApprovedAndCommentedPullRequest,
        test: true,
      });

      options.all([
        loftSomsUser.login,
        flossTomUser.login,
        loftMossUser.login,
      ]);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

});
