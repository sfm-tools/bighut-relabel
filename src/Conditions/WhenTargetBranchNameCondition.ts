import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenTargetBranchNameCondition extends BaseCondition {

  public test(context: LabelerContext): boolean {
    const {
      noOne,
    } = this.getOptions();

    return this.testStringValue(
      context.pullRequest.targetBranch.name,
      context
    ) && !noOne;
  }

}
