import { expect } from 'chai';

import { DefaultConditionOptions } from '../../src/ConditionOptions';
import { WhenLabelCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenLabelCondition', () => {
  const context = new LabelerContext(pullRequests[0], true);

  it('should return true for an existing label using a string predicate', (): void => {
    const when = new WhenLabelCondition('enhancement');

    expect(when.test(context)).to.be.true;
  });

  it('should return true for an existing label using a string array predicate', (): void => {
    const when = new WhenLabelCondition(['bug', 'enhancement']);

    expect(when.test(context)).to.be.true;
  });

  it('should return true for an existing label using a regular expression predicate', (): void => {
    const when = new WhenLabelCondition(/^enhancement$/);

    expect(when.test(context)).to.be.true;
  });

  it('should return true for an existing label using a function predicate', (): void => {
    const when = new WhenLabelCondition((value: string): boolean => {
      return value === 'enhancement';
    });

    expect(when.test(context)).to.be.true;
  });

  it('should return false for an non-existing label using a string predicate', (): void => {
    const when = new WhenLabelCondition('bug');

    expect(when.test(context)).to.be.false;
  });

  it('should return false for an non-existing label using a string array predicate', (): void => {
    const when = new WhenLabelCondition(['bug', 'bugs', 'bugfix', 'checked']);

    expect(when.test(context)).to.be.false;
  });

  it('should return false for an non-existing label using a regular expression predicate', (): void => {
    const when = new WhenLabelCondition(/bug(s?)|bugfix|checked/g);

    expect(when.test(context)).to.be.false;
  });

  it('should return false for an existing label with the "nothing" option', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenLabelCondition('enhancement', options);

    options.nothing();

    expect(when.test(context)).to.be.false;
  });

  it('should return false for an existing multiple labels with the "nothing" option using a string array predicate', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenLabelCondition(['bug', 'enhancement', 'ui'], options);

    options.nothing();

    expect(when.test(context)).to.be.false;
  });

  it('should return false for an non-existing label with the "nothing" option', (): void => {
    const options = new DefaultConditionOptions(null);
    const when = new WhenLabelCondition('bug');

    options.nothing();

    expect(when.test(context)).to.be.false;
  });

});
