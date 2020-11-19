import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenLabelCondition extends BaseCondition {

  public test(context: LabelerContext): boolean {
    let result = false;

    for (const label of context.pullRequest.labels) {
      result = this.testStringValue(
        label,
        context
      );

      if (result) {
        break;
      }
    }

    return this.testResult(result, context);
  }

}
