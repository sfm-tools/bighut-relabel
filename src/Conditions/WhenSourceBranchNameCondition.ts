import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenSourceBranchNameCondition extends BaseCondition {

  public test(context: LabelerContext): boolean {
    const {
      noOne,
    } = this.getOptions();

    return this.testStringValue(
      context.pullRequest.sourceBranch.name,
      context
    ) && !noOne;
  }

}
