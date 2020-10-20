import { WhenFileContentConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenFileContentCondition extends BaseCondition<DefaultPredicateType, WhenFileContentConditionOptions> {

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      noOne,
      onlyModifiedFiles,
      onlyNewFiles,
    } = this.getOptions();

    const predicate = typeof this.predicate === 'string'
      ? (fileContent: string): boolean => fileContent.includes(this.predicate.toString())
      : this.predicate;

    const files = await context.pullRequest.files;

    let result = false;

    for (const file of files) {
      if (onlyModifiedFiles && file.status !== 'modified') {
        continue;
      }

      if (onlyNewFiles && file.status !== 'added') {
        continue;
      }

      try {
        const content = await file.content;
        result = this.testStringValue(content, context, predicate);
      } catch (error) {
        console.error(error);
      }

      if (result) {
        break;
      }
    }

    return result && !noOne;
  }

}
