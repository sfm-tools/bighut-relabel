import { expect } from 'chai';

import { WhenFileCountConditionOptions } from '../../src/ConditionOptions';
import { WhenFileCountCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenFileCountCondition', () => {

  describe('equal', () => {
    it('should return true if the number of files matches', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.equal(7);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files non-matches', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.equal(123);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThan', () => {
    it('should return true when the number of files greater than the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThan(3);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files less than the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThan(123);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThanOrEqualTo', () => {
    it('should return true when the number of files greater than the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThanOrEqualTo(5);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of files equals to the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThanOrEqualTo(7);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files less than the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.greaterThanOrEqualTo(8);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('lessThan', () => {
    it('should return true when the number of files less than the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThan(100);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files greater than the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThan(1);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

  describe('greaterThanOrEqualTo', () => {
    it('should return true when the number of files less than the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThanOrEqualTo(15);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return true when the number of files equals to the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThanOrEqualTo(7);

      const result = await when.test(context);

      expect(result).to.be.true;
    });

    it('should return false when the number of files greater than the specified value', async(): Promise<void> => {
      const options = new WhenFileCountConditionOptions(null);
      const when = new WhenFileCountCondition(options);
      const context = new LabelerContext(pullRequests[0]);

      options.lessThanOrEqualTo(0);

      const result = await when.test(context);

      expect(result).to.be.false;
    });
  });

});