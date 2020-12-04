import { DefaultConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenContainsRequestsToReview extends BaseCondition<boolean, DefaultConditionOptions> {

  constructor(hasConflicts: boolean, options?: DefaultConditionOptions) {
    super(hasConflicts, options);
  }

  public test(context: LabelerContext): boolean {
    const {
      requestedReviewers,
    } = context.pullRequest;

    if (this.predicate) {
      return this.testResult(
        requestedReviewers.length > 0,
        context
      );
    } else {
      return this.testResult(
        requestedReviewers.length === 0,
        context
      );
    }
  }

}
