import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenMilestoneNameCondition extends BaseCondition {

  public test(context: LabelerContext): boolean {
    const {
      milestone,
    } = context.pullRequest;

    return this.testResult(
      this.testStringValue(
        milestone?.name,
        context
      ),
      context
    );
  }

}
