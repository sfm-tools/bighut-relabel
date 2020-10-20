import { StringConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType, StringComparer } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenTitleCondition extends BaseCondition<DefaultPredicateType, StringConditionOptions> {

  protected get stringComparer(): StringComparer {
    return BaseCondition.containsString;
  }

  public test(context: LabelerContext): boolean {
    const {
      exclude,
      noOne,
    } = this.getOptions();

    const {
      title,
    } = context.pullRequest;

    if (this.testForExcludedSting(title, context, exclude)) {
      return false;
    }

    return this.testStringValue(
      title,
      context
    ) && !noOne;
  }

}
