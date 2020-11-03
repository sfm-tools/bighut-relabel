import { expect } from 'chai';

import { WhenFileContentConditionOptions } from '../../src/ConditionOptions';
import { WhenFileContentCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenFileContentCondition', () => {
  const context = new LabelerContext({
    pullRequest: pullRequests[0],
    test: true,
  });

  it('should return true for an existing substring', async(): Promise<void> => {
    const when = new WhenFileContentCondition('awesome-application');
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a non-existing substring', async(): Promise<void> => {
    const when = new WhenFileContentCondition('abracadabra');
    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for an existing substring in added file with onlyNewFiles option', async(): Promise<void> => {
    const options = new WhenFileContentConditionOptions(null);
    const when = new WhenFileContentCondition((content: string): boolean => (
      content.includes('React.Component')
    ), options);

    options.onlyNewFiles();

    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for an existing substring in modified file with onlyNewFiles option', async(): Promise<void> => {
    const options = new WhenFileContentConditionOptions(null);
    const when = new WhenFileContentCondition(/ValuesController/, options);

    options.onlyNewFiles();

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return true for an existing substring in modified file with onlyModifiedFiles option', async(): Promise<void> => {
    const options = new WhenFileContentConditionOptions(null);
    const when = new WhenFileContentCondition(/ValuesController/, options);

    options.onlyModifiedFiles();

    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for an existing substring with the "nothing" option', async(): Promise<void> => {
    const options = new WhenFileContentConditionOptions(null);
    const when = new WhenFileContentCondition(/AspNetCore/, options);

    options.nothing();

    const result = await when.test(context);

    expect(result).to.be.false;
  });

});
