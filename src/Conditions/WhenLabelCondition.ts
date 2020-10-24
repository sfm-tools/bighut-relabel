import { StringConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenLabelCondition extends BaseCondition<DefaultPredicateType, StringConditionOptions> {

  public test(context: LabelerContext): boolean {
    const {
      nothing,
      exclude,
    } = this.getOptions();

    let result = false;

    if (exclude?.length) {
      for (const label of context.pullRequest.labels) {
        if (this.testForExcludedSting(label, context, exclude)) {
          return false;
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

    return result && !nothing;
  }

}
