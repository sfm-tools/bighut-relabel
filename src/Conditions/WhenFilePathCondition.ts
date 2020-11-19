import { WhenFilePathConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenFilePathCondition extends BaseCondition<DefaultPredicateType, WhenFilePathConditionOptions> {

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      excludeFilePath,
      excludeModifiedFiles,
      excludeNewFiles,
      excludeRemovedFiles,
    } = super.getOptions();

    const files = await context.pullRequest.files.get();

    let result = false;

    for (const file of files) {
      if (excludeRemovedFiles && file.status === 'removed') {
        continue;
      }

      if (excludeModifiedFiles && file.status === 'modified') {
        continue;
      }

      if (excludeNewFiles && file.status === 'added') {
        continue;
      }

      if (excludeFilePath?.length) {
        let isExcluded = false;

        for (const exclude of excludeFilePath) {
          isExcluded = this.testStringValue(file.filePath, context, exclude);

          if (isExcluded) {
            break;
          }
        }

        if (isExcluded) {
          continue;
        }
      }

      result = this.testStringValue(file.filePath, context);

      if (result) {
        break;
      }
    }

    return this.testResult(result, context);
  }

}
