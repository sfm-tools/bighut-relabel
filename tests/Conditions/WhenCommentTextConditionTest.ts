import { expect } from 'chai';

import { WhenCommentTextConditionOptions } from '../../src/ConditionOptions';
import { WhenCommentTextCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenCommentTextCondition', () => {
  const context = new LabelerContext(pullRequests[0]);

  it('should return true when the specified substring is found in comments', async(): Promise<void> => {
    const when = new WhenCommentTextCondition('great');
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false when the specified substring is not found in comments', async(): Promise<void> => {
    const when = new WhenCommentTextCondition('abracadabra');
    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return false for an existing substring with multiple exclude option', async(): Promise<void> => {
    const options = new WhenCommentTextConditionOptions(null);
    const when = new WhenCommentTextCondition('great', options);

    options
      .exclude('abracadabra')
      .exclude((message: string): boolean => message === 'test')
      .exclude(/nothing works/ig);

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return false for an existing substring when the author login does not match', async(): Promise<void> => {
    const options = new WhenCommentTextConditionOptions(null);
    const when = new WhenCommentTextCondition('great', options);

    options.andAlsoAuthorLogin('floss.tom');

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for an existing substring when the author login is match', async(): Promise<void> => {
    const options = new WhenCommentTextConditionOptions(null);
    const when = new WhenCommentTextCondition(/hope someone/gi, options);

    options.andAlsoAuthorLogin('floss.tom');

    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for an existing substring if the creation date is less than the specified range by date from', async(): Promise<void> => {
    const options = new WhenCommentTextConditionOptions(null);
    const when = new WhenCommentTextCondition(/hope someone/gi, options);

    options.andAlsoCreationDate({ from: new Date(2020, 10, 1) });

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for an existing substring when the creation date matches the specified range by date from', async(): Promise<void> => {
    const options = new WhenCommentTextConditionOptions(null);
    const when = new WhenCommentTextCondition(/hope someone/gi, options);

    options.andAlsoCreationDate({ from: new Date(2020, 9, 1) });

    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for an existing substring if the creation date is greater than the specified range by date to', async(): Promise<void> => {
    const options = new WhenCommentTextConditionOptions(null);
    const when = new WhenCommentTextCondition(/hope someone/gi, options);

    options.andAlsoCreationDate({ to: new Date(2020, 9, 22) });

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for an existing substring when the creation date matches the specified range by date to', async(): Promise<void> => {
    const options = new WhenCommentTextConditionOptions(null);
    const when = new WhenCommentTextCondition(/hope someone/gi, options);

    options.andAlsoCreationDate({ to: new Date(2020, 9, 23) });

    const result = await when.test(context);

    expect(result).to.be.true;
  });

});
