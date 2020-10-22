import { expect } from 'chai';

import { StringConditionOptions } from '../../src/ConditionOptions';
import { WhenTitleCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenTitleCondition', () => {
  const context = new LabelerContext(pullRequests[0]);

  it('should return true for a fully matched title', (): void => {
    const when = new WhenTitleCondition('Awesome pull request');

    expect(when.test(context)).to.be.true;
  });

  it('should return true for the found substring in title', (): void => {
    const when = new WhenTitleCondition('pull');

    expect(when.test(context)).to.be.true;
  });

  it('should return false when the specified substring is not found in a title', (): void => {
    const when = new WhenTitleCondition('abracadabra');

    expect(when.test(context)).to.be.false;
  });

  it('should return false for an existing substring with multiple exclude option', (): void => {
    const options = new StringConditionOptions(null);
    const when = new WhenTitleCondition('request', options);

    options
      .exclude('abracadabra')
      .exclude(/awesome/ig);

    expect(when.test(context)).to.be.false;
  });

});
