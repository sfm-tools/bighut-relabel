import { expect } from 'chai';

import { StringConditionOptions } from '../../src/ConditionOptions';
import { WhenLabelCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenLabelCondition', () => {
  const context = new LabelerContext(pullRequests[0]);

  it('should return true for an existing label using a string predicate', (): void => {
    const when = new WhenLabelCondition('enhancement');

    expect(true).equal(when.test(context));
  });

  it('should return true for an existing label using a string array predicate', (): void => {
    const when = new WhenLabelCondition(['bug', 'enhancement']);

    expect(true).equal(when.test(context));
  });

  it('should return true for an existing label using a regular expression predicate', (): void => {
    const when = new WhenLabelCondition(/^enhancement$/);

    expect(true).equal(when.test(context));
  });

  it('should return true for an existing label using a function predicate', (): void => {
    const when = new WhenLabelCondition((value: string): boolean => {
      return value === 'enhancement';
    });

    expect(true).equal(when.test(context));
  });

  it('should return false for an non-existing label using a string predicate', (): void => {
    const when = new WhenLabelCondition('bug');

    expect(false).equal(when.test(context));
  });

  it('should return false for an non-existing label using a string array predicate', (): void => {
    const when = new WhenLabelCondition(['bug', 'bugs', 'bugfix', 'checked']);

    expect(false).equal(when.test(context));
  });

  it('should return false for an non-existing label using a regular expression predicate', (): void => {
    const when = new WhenLabelCondition(/bug(s?)|bugfix|checked/g);

    expect(false).equal(when.test(context));
  });

  it('should return false for an existing label with noOne option', (): void => {
    const options = new StringConditionOptions(null);
    const when = new WhenLabelCondition('enhancement', options);

    options.noOne();

    expect(false).equal(when.test(context));
  });

  it('should return false for an existing multiple labels with noOne option using a string array predicate', (): void => {
    const options = new StringConditionOptions(null);
    const when = new WhenLabelCondition(['bug', 'enhancement', 'ui'], options);

    options.noOne();

    expect(false).equal(when.test(context));
  });

  it('should return false for an non-existing label with noOne option', (): void => {
    const options = new StringConditionOptions(null);
    const when = new WhenLabelCondition('bug');

    options.noOne();

    expect(false).equal(when.test(context));
  });

  it('should return false for an existing label with exclude option', (): void => {
    const options = new StringConditionOptions(null);
    const when = new WhenLabelCondition('enhancement', options);

    options.exclude('ui');

    expect(false).equal(when.test(context));
  });

  it('should return false for an existing label with multiple exclude option', (): void => {
    const options = new StringConditionOptions(null);
    const when = new WhenLabelCondition('enhancement', options);

    options
      .exclude('invalid')
      .exclude('fix')
      .exclude('ui');

    expect(false).equal(when.test(context));
  });

});
