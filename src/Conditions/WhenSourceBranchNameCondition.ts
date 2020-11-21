import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenSourceBranchNameCondition extends BaseCondition {

  public test(context: LabelerContext): boolean {
    return this.testResult(
      this.testStringValue(
        context.pullRequest.sourceBranch.name,
        context
      ),
      context
    );
  }

}
