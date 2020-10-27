import chalk from 'chalk';

import { WhenFileContentConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType, StringComparer } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenFileContentCondition extends BaseCondition<DefaultPredicateType, WhenFileContentConditionOptions> {

  protected get stringComparer(): StringComparer {
    return BaseCondition.containsString;
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      onlyModifiedFiles,
      onlyNewFiles,
    } = this.getOptions();

    const files = await context.pullRequest.files.get();

    let result = false;

    for (const file of files) {
      if (onlyModifiedFiles && file.status !== 'modified') {
        continue;
      }

      if (onlyNewFiles && file.status !== 'added') {
        continue;
      }

      try {
        const content = await file.content.get();
        result = this.testStringValue(content, context);
      } catch (error) {
        if (error instanceof Error) {
          context.log(chalk.red(`..file "${file.filePath}" not found.`));
        } else if (typeof error === 'string') {
          context.log(error);
        } else {
          context.log(error);
        }
      }

      if (result) {
        break;
      }
    }

    return this.testResult(result);
  }

}
