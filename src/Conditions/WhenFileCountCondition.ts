import { WhenNumberConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenFileCountCondition extends BaseCondition<DefaultPredicateType, WhenNumberConditionOptions> {

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
      between,
    } = super.getOptions(context);

    const { changedFiles } = await context.pullRequest.statusInfo.get();

    // TODO: helper
    if (equal && changedFiles === equal) {
      return this.testResult(true, context);
    }

    if (greaterThan && changedFiles > greaterThan) {
      return this.testResult(true, context);
    }

    if (greaterThanOrEqualTo && changedFiles >= greaterThanOrEqualTo) {
      return this.testResult(true, context);
    }

    if (lessThan && changedFiles < lessThan) {
      return this.testResult(true, context);
    }

    if (lessThanOrEqualTo && changedFiles <= lessThanOrEqualTo) {
      return this.testResult(true, context);
    }

    if (between && changedFiles >= between.from && changedFiles <= between.to) {
      return this.testResult(true, context);
    }

    return this.testResult(false, context);
  }

}
