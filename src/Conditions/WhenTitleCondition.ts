import { LabelerContext } from '../LabelerContext';
import { StringComparer } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenTitleCondition extends BaseCondition {

  protected get stringComparer(): StringComparer {
    return BaseCondition.containsString;
  }

  public test(context: LabelerContext): boolean {
    const {
      title,
    } = context.pullRequest;

    return this.testResult(
      this.testStringValue(
        title,
        context
      ),
      context
    );
  }

}
