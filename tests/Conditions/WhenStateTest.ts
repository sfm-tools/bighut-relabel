import { expect } from 'chai';

import { DefaultConditionOptions } from '../../src/ConditionOptions';
import { WhenState } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';
import { closedPullRequest, mergedPullRequest } from '../Resources/PullRequests';

describe('WhenState', () => {

  it('should return true for opened a pull request', (): void => {
    const when = new WhenState('open');
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    expect(when.test(context)).to.be.true;
  });

  it('should return false for opened a pull request with the "nothing" options', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenState('open', options);
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    options.nothing();

    expect(when.test(context)).to.be.false;
  });

  it('should return true for closed a pull request', (): void => {
    const when = new WhenState('closed');
    const context = new LabelerContext({
      pullRequest: closedPullRequest,
      test: true,
    });

    expect(when.test(context)).to.be.true;
  });

  it('should return false for closed a pull request with the "nothing" options', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenState('closed', options);
    const context = new LabelerContext({
      pullRequest: closedPullRequest,
      test: true,
    });

    options.nothing();

    expect(when.test(context)).to.be.false;
  });

  it('should return false for merged a pull request', (): void => {
    const when = new WhenState('closed');
    const context = new LabelerContext({
      pullRequest: mergedPullRequest,
      test: true,
    });

    expect(when.test(context)).to.be.false;
  });

  it('should return true for merged a pull request with the "nothing" options', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenState('closed', options);
    const context = new LabelerContext({
      pullRequest: mergedPullRequest,
      test: true,
    });

    options.nothing();

    expect(when.test(context)).to.be.true;
  });

  it('should return true for merged a pull request', (): void => {
    const when = new WhenState('merged');
    const context = new LabelerContext({
      pullRequest: mergedPullRequest,
      test: true,
    });

    expect(when.test(context)).to.be.true;
  });

  it('should return false for merged a pull request with the "nothing" options', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenState('merged', options);
    const context = new LabelerContext({
      pullRequest: mergedPullRequest,
      test: true,
    });

    options.nothing();

    expect(when.test(context)).to.be.false;
  });

});
