import { expect } from 'chai';

import { StringConditionOptions } from '../../src/ConditionOptions';
import { WhenDescriptionCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenDescriptionCondition', () => {
  const context = new LabelerContext(pullRequests[0]);

  it('should return true for the found substring in description', (): void => {
    const when = new WhenDescriptionCondition('World');

    expect(true).equal(when.test(context));
  });

  it('should return false when the specified substring is not found in description', (): void => {
    const when = new WhenDescriptionCondition('abracadabra');

    expect(false).equal(when.test(context));
  });

  it('should return false for an existing substring with exclude option', (): void => {
    const options = new StringConditionOptions(null);
    const when = new WhenDescriptionCondition('World', options);

    options.exclude(/hell/ig);

    expect(false).equal(when.test(context));
  });

  it('should return false for an existing substring with multiple exclude option', (): void => {
    const options = new StringConditionOptions(null);
    const when = new WhenDescriptionCondition('World', options);

    options
      .exclude('abracadabra')
      .exclude((value: string): boolean => value.includes('abc'))
      .exclude(/hell/ig);

    expect(false).equal(when.test(context));
  });

  it('should return true for an existing substring with multiple exclude option', (): void => {
    const options = new StringConditionOptions(null);
    const when = new WhenDescriptionCondition('World', options);

    options
      .exclude('abracadabra')
      .exclude((value: string): boolean => value.includes('abc'))
      .exclude(/lleh/ig);

    expect(true).equal(when.test(context));
  });

});
