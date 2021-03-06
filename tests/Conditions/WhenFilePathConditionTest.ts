import { expect } from 'chai';

import { WhenFilePathConditionOptions } from '../../src/ConditionOptions';
import { WhenFilePathCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('WhenFilePathCondition', () => {
  const context = new LabelerContext({
    pullRequest: firstPullRequest,
    test: true,
  });

  it('should return true for an existing file using a string predicate', async(): Promise<void> => {
    const when = new WhenFilePathCondition('Frontend/package.json');
    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return true for an existing in list file using a function predicate', async(): Promise<void> => {
    const when = new WhenFilePathCondition((filePath: string): boolean => (
      filePath.includes('webpack.js')
    ));

    const result = await when.test(context);

    expect(result).to.be.true;
  });

  it('should return false for a removed file with excludeRemovedFiles option', async(): Promise<void> => {
    const options = new WhenFilePathConditionOptions(null);
    const when = new WhenFilePathCondition((filePath: string): boolean => (
      filePath.includes('webpack.js')
    ), options);

    options.excludeRemovedFiles();

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return false for a new file  that was excluded using with excludeNewFiles option', async(): Promise<void> => {
    const options = new WhenFilePathConditionOptions(null);
    const when = new WhenFilePathCondition((filePath: string): boolean => (
      filePath.includes('package.json')
    ), options);

    options.excludeNewFiles();

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return false for a new file  that was excluded using with excludeNewFiles option', async(): Promise<void> => {
    const options = new WhenFilePathConditionOptions(null);
    const when = new WhenFilePathCondition((filePath: string): boolean => (
      filePath.includes('Backend/Controllers/ValuesController.cs')
    ), options);

    options.excludeModifiedFiles();

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return false for an existing file that was excluded using excludeFilePath option', async(): Promise<void> => {
    const options = new WhenFilePathConditionOptions(null);
    const when = new WhenFilePathCondition(/\.json$/, options);

    options.excludeFilePath(/package\.json/);

    const result = await when.test(context);

    expect(result).to.be.false;
  });

  it('should return true twice for the match found', async(): Promise<void> => {
    const regExp = /.json/g;
    const options = new WhenFilePathConditionOptions(null);
    const when = new WhenFilePathCondition(regExp, options);

    const result = await when.test(context);
    const result2 = await when.test(context);

    expect(result).to.be.true;
    expect(result2).to.be.true;
  });

});
