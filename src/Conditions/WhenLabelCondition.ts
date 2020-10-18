import { StringConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenLabelCondition extends BaseCondition<DefaultPredicateType, StringConditionOptions> {

  public test(context: LabelerContext): boolean {
    const {
      noOne,
      exclude,
    } = this.getOptions();

    let result = false;

    if (exclude?.length) {
      for (const predicate of exclude) {
        for (const label of context.pullRequest.labels) {
          if (this.testStringValue(label, context, predicate)) {
            noOne && console.warn('noOne not works with the exclude option');
            return false;
          }
        }
      }
    }

    for (const label of context.pullRequest.labels) {
      result = this.testStringValue(
        label,
        context
      );

      if (result) {
        break;
      }
    }

    return result && !noOne;
  }

}