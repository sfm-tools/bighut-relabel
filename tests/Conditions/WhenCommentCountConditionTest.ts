import { expect } from 'chai';

import { WhenNumberConditionOptions } from '../../src/ConditionOptions';
import { WhenCommentCountCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('WhenCommentCountCondition', () => {

  describe('equal', () => {
    it('should return true if the number of comments matches', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.equal(4);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments non-matches', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.equal(123);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThan', () => {
    it('should return true when the number of comments greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.greaterThan(1);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.greaterThan(123);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThanOrEqualTo', () => {
    it('should return true when the number of comments greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.greaterThanOrEqualTo(2);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of comments equals to the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.greaterThanOrEqualTo(4);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.greaterThanOrEqualTo(5);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('lessThan', () => {
    it('should return true when the number of comments less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThan(42);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThan(1);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThanOrEqualTo', () => {
    it('should return true when the number of comments less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThanOrEqualTo(512);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of comments equals to the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThanOrEqualTo(4);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThanOrEqualTo(1);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

});
