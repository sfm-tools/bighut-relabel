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
      excludePaths,
      includeOnlyPaths,
    } = this.getOptions(context);

    const files = await context.pullRequest.files.get();

    let result = false;

    for (const file of files) {
      if (excludePaths && this.testStringValue(file.filePath, context, excludePaths)) {
        continue;
      }

      if (includeOnlyPaths && !this.testStringValue(file.filePath, context, includeOnlyPaths)) {
        continue;
      }

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
          context.logger.error('file "{filePath}" not found.', file);
        } else if (typeof error === 'string') {
          context.logger.error(error);
        } else {
          context.logger.error(error);
        }
      }

      if (result) {
        break;
      }
    }

    return this.testResult(result, context);
  }

}
