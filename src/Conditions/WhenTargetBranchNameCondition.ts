import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenTargetBranchNameCondition extends BaseCondition {

  public test(context: LabelerContext): boolean {
    return this.testResult(
      this.testStringValue(
        context.pullRequest.targetBranch.name,
        context
      )
    );
  }

}
