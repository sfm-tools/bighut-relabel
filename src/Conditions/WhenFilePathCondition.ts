import { WhenFilePathConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenFilePathCondition extends BaseCondition<DefaultPredicateType, WhenFilePathConditionOptions> {

  public async test(context: LabelerContext): Promise<boolean> {
    const options = this.getOptions(context);
    const {
      excludeFilePath,
      excludeModifiedFiles,
      excludeNewFiles,
      excludeRemovedFiles,
    } = options;

    const files = await context.pullRequest.files.get();

    context.logger.debug(
      '{class}.{method}: pr#{pullRequest.code}: checking {count} files',
      {
        class: this.constructor.name,
        method: this.test.name,
        count: files.length,
        pullRequest: context.pullRequest,
        options,
      }
    );

    let result = false;

    for (let i = 0, ic = files.length; i < ic; ++i) {
      const file = files[i];

      if (excludeRemovedFiles && file.status === 'removed') {
        context.logger.debug(
          '{class}.{method}: pr#{pullRequest.code}: skip removed file "{file.filePath}"',
          {
            class: this.constructor.name,
            method: this.test.name,
            index: i,
            count: ic,
            file,
            pullRequest: context.pullRequest,
            options,
          }
        );
        continue;
      }

      if (excludeModifiedFiles && file.status === 'modified') {
        context.logger.debug(
          '{class}.{method}: pr#{pullRequest.code}: skip modified file "{file.filePath}"',
          {
            class: this.constructor.name,
            method: this.test.name,
            index: i,
            count: ic,
            file,
            pullRequest: context.pullRequest,
            options,
          }
        );
        continue;
      }

      if (excludeNewFiles && file.status === 'added') {
        context.logger.debug(
          '{class}.{method}: pr#{pullRequest.code}: skip added file "{file.filePath}"',
          {
            class: this.constructor.name,
            method: this.test.name,
            index: i,
            count: ic,
            file,
            pullRequest: context.pullRequest,
            options,
          }
        );
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
          context.logger.debug(
            '{class}.{method}: pr#{pullRequest.code}: skip excluded file "{file.filePath}"',
            {
              class: this.constructor.name,
              method: this.test.name,
              index: i,
              count: ic,
              file,
              pullRequest: context.pullRequest,
              options,
            }
          );
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
