import { expect } from 'chai';

import { WhenNumberConditionOptions } from '../../src/ConditionOptions';
import { WhenCommitCountCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenCommitCountCondition', () => {

  describe('equal', () => {
    it('should return true if the number of commits matches', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.equal(3);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of commits non-matches', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.equal(123);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThan', () => {
    it('should return true when the number of commits greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.greaterThan(1);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of commits less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.greaterThan(123);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThanOrEqualTo', () => {
    it('should return true when the number of commits greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.greaterThanOrEqualTo(2);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of commits equals to the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.greaterThanOrEqualTo(3);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of commits less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.greaterThanOrEqualTo(5);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('lessThan', () => {
    it('should return true when the number of commits less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.lessThan(42);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of commits greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.lessThan(1);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThanOrEqualTo', () => {
    it('should return true when the number of commits less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.lessThanOrEqualTo(512);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of commits equals to the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.lessThanOrEqualTo(3);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of commits greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenCommitCountCondition(options);
      const context = new LabelerContext(pullRequests[0], true);

      options.lessThanOrEqualTo(0);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

});
