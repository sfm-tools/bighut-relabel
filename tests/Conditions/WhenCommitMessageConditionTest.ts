import { expect } from 'chai';

import { StringConditionOptions } from '../../src/ConditionOptions';
import { WhenCommitMessageCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenCommitMessageCondition', () => {
  const context = new LabelerContext(pullRequests[0]);

  it('should return true when the specified substring is found in commit messages', async(): Promise<void> => {
    const when = new WhenCommitMessageCondition('bug');
    const result = await when.test(context);

    expect(true).equal(result);
  });

  it('should return false when the specified substring is not found in commit messages', async(): Promise<void> => {
    const when = new WhenCommitMessageCondition('abracadabra');
    const result = await when.test(context);

    expect(false).equal(result);
  });

  it('should return false for an existing substring with multiple exclude option', async(): Promise<void> => {
    const options = new StringConditionOptions(null);
    const when = new WhenCommitMessageCondition('request', options);

    options
      .exclude('abracadabra')
      .exclude((message: string): boolean => message === 'code style fix')
      .exclude(/Merge branch/ig);

    const result = await when.test(context);

    expect(false).equal(result);
  });

});
