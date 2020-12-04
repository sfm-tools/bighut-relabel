import { User } from '../ApiProviders';
import { WhenContainsRequestsToReviewConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenContainsRequestsToReviewCondition extends BaseCondition<boolean, WhenContainsRequestsToReviewConditionOptions> {

  constructor(hasConflicts: boolean, options?: WhenContainsRequestsToReviewConditionOptions) {
    super(hasConflicts, options);
  }

  public test(context: LabelerContext): boolean {
    const {
      all,
      oneOf,
      value,
    } = this.getOptions(context);

    const users = [...value || []];
    const hasUsers = !!users.length;

    const {
      requestedReviewers,
    } = context.pullRequest;

    if (hasUsers) {
      if (oneOf) {
        if (
          requestedReviewers.filter(
            (user: User): boolean => (
              users.includes(user.login)
            )
          ).length === 0
        ) {
          return this.testResult(false, context);
        }
      }

      if (all) {
        if (
          !requestedReviewers.every(
            (user: User): boolean => (
              users.includes(user.login)
            )
          )
        ) {
          return this.testResult(false, context);
        }
      }
    }

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
