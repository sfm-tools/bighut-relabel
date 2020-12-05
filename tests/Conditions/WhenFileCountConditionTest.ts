import { expect } from 'chai';

import { WhenNumberConditionOptions } from '../../src/ConditionOptions';
import { WhenFileCountCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('WhenFileCountCondition', () => {

  describe('equal', () => {
    it('should return true if the number of files matches', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.equal(8);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files non-matches', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
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
    it('should return true when the number of files greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.greaterThan(3);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
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
    it('should return true when the number of files greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.greaterThanOrEqualTo(5);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of files equals to the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.greaterThanOrEqualTo(8);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.greaterThanOrEqualTo(9);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('lessThan', () => {
    it('should return true when the number of files less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThan(100);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThan(1);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('lessThanOrEqualTo', () => {
    it('should return true when the number of files less than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThanOrEqualTo(15);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of files equals to the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThanOrEqualTo(8);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files greater than the specified value', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.lessThanOrEqualTo(0);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('between', () => {
    it('should return true if the number of files falls within the specified range', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.between(2, 10);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false if the number of files is outside the specified range', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options.between(10, 25);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThanOrEqualTo + lessThanOrEqualTo', () => {
    it('should return true if the number of files falls within the specified range', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options
        .greaterThanOrEqualTo(2)
        .lessThanOrEqualTo(8);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false if the number of files is outside the specified range', async(): Promise<void> => {
      const options = new WhenNumberConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext({
        pullRequest: firstPullRequest,
        test: true,
      });

      options
        .greaterThanOrEqualTo(9)
        .lessThanOrEqualTo(20);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

});
