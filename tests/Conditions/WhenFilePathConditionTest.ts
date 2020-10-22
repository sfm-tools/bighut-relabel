import { expect } from 'chai';

import { WhenFilePathConditionOptions } from '../../src/ConditionOptions';
import { WhenFilePathCondition } from '../../src/Conditions';
import { LabelerContext } from '../../src/LabelerContext';
import { pullRequests } from '../Resources';

describe('WhenFilePathCondition', () => {
  const context = new LabelerContext(pullRequests[0]);

  it('should return true for an existing file using a string predicate', async(): Promise<void> => {
    const when = new WhenFilePathCondition('Frontend/package.json');
    const result = await when.test(context);

    expect(true).to.equal(result);
  });

  it('should return true for an existing in list file using a function predicate', async(): Promise<void> => {
    const when = new WhenFilePathCondition((filePath: string): boolean => (
      filePath.includes('webpack.js')
    ));

    const result = await when.test(context);

    expect(true).to.equal(result);
  });

  it('should return false for a removed file with excludeRemovedFiles option', async(): Promise<void> => {
    const options = new WhenFilePathConditionOptions(null);
    const when = new WhenFilePathCondition((filePath: string): boolean => (
      filePath.includes('webpack.js')
    ), options);

    options.excludeRemovedFiles();

    const result = await when.test(context);

    expect(false).to.equal(result);
  });

  it('should return false for a new file  that was excluded using with excludeNewFiles option', async(): Promise<void> => {
    const options = new WhenFilePathConditionOptions(null);
    const when = new WhenFilePathCondition((filePath: string): boolean => (
      filePath.includes('package.json')
    ), options);

    options.excludeNewFiles();

    const result = await when.test(context);

    expect(false).to.equal(result);
  });

  it('should return false for a new file  that was excluded using with excludeNewFiles option', async(): Promise<void> => {
    const options = new WhenFilePathConditionOptions(null);
    const when = new WhenFilePathCondition((filePath: string): boolean => (
      filePath.includes('Backend/Controllers/ValuesController.cs')
    ), options);

    options.excludeModifiedFiles();

    const result = await when.test(context);

    expect(false).to.equal(result);
  });

  it('should return false for an existing file that was excluded using excludeFilePath option', async(): Promise<void> => {
    const options = new WhenFilePathConditionOptions(null);
    const when = new WhenFilePathCondition(/.json/g, options);

    options.excludeFilePath(/package.json/g);

    const result = await when.test(context);

    expect(false).to.equal(result);
  });

});
