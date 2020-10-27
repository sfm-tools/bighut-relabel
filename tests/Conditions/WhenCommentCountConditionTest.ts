import { expect } from 'chai';

import { WhenNumberConditionOptions } from '../../src/ConditionOptions';
import { WhenCommentCountCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenCommentCountCondition', () => {

  describe('equal', () => {
    it('should return true if the number of comments matches', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.equal(4);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments non-matches', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.equal(123);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThan', () => {
    it('should return true when the number of comments greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThan(1);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThan(123);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThanOrEqualTo', () => {
    it('should return true when the number of comments greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThanOrEqualTo(2);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of comments equals to the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThanOrEqualTo(4);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThanOrEqualTo(5);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('lessThan', () => {
    it('should return true when the number of comments less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThan(42);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThan(1);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThanOrEqualTo', () => {
    it('should return true when the number of comments less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThanOrEqualTo(512);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of comments equals to the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThanOrEqualTo(4);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of comments greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommentCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThanOrEqualTo(1);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

});
