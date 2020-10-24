import { StringConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType, StringComparer } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenDescriptionCondition extends BaseCondition<DefaultPredicateType, StringConditionOptions> {

  protected get stringComparer(): StringComparer {
    return BaseCondition.containsString;
  }

  public test(context: LabelerContext): boolean {
    const {
      exclude,
      nothing,
    } = this.getOptions();

    const {
      description,
    } = context.pullRequest;

    if (this.testForExcludedSting(description, context, exclude)) {
      return false;
    }

    return this.testStringValue(
      description,
      context
    ) && !nothing;
  }

}
