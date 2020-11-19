import { expect } from 'chai';

import { DefaultConditionOptions } from '../../src/ConditionOptions';
import { WhenCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('WhenCondition', () => {

  it('test of true predicate result should return true', async(): Promise<void> => {
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !!context.pullRequest;
    });

    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('test of false predicate result should return false', async(): Promise<void> => {
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !context.pullRequest;
    });

    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('test of true predicate using the "nothing" option should return false', async(): Promise<void> => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !!context.pullRequest;
    }, options);

    options.nothing();

    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('test of false predicate using the "nothing" option should return true', async(): Promise<void> => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenCondition((context: LabelerContext): boolean => {
      return !context.pullRequest;
    }, options);

    options.nothing();

    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('test of true async predicate result should return true', async(): Promise<void> => {
    const when = new WhenCondition((context: LabelerContext): Promise<boolean> => {
      return new Promise(resolve => setTimeout(() => resolve(true), 100));
    });

    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const result = await when.test(context);

    expect(result).to.be.true;
  });

});
