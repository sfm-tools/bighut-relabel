import { WhenNumberConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenCommitCountCondition extends BaseCondition<DefaultPredicateType, WhenNumberConditionOptions> {

  constructor(options: WhenNumberConditionOptions) {
    super(undefined, options);
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      equal,
      greaterThan,
      greaterThanOrEqualTo,
      lessThan,
      lessThanOrEqualTo,
    } = super.getOptions(context);

    const { commits: count } = await context.pullRequest.statusInfo.get();

    // TODO: helper
    if (equal && count === equal) {
      return this.testResult(true, context);
    }

    if (greaterThan && count > greaterThan) {
      return this.testResult(true, context);
    }

    if (greaterThanOrEqualTo && count >= greaterThanOrEqualTo) {
      return this.testResult(true, context);
    }

    if (lessThan && count < lessThan) {
      return this.testResult(true, context);
    }

    if (lessThanOrEqualTo && count <= lessThanOrEqualTo) {
      return this.testResult(true, context);
    }

    return this.testResult(false, context);
  }

}
