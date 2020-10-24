import { LabelerContext } from '../LabelerContext';
import { StringComparer } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenDescriptionCondition extends BaseCondition {

  protected get stringComparer(): StringComparer {
    return BaseCondition.containsString;
  }

  public test(context: LabelerContext): boolean {
    const {
      description,
    } = context.pullRequest;

    return this.testResult(
      this.testStringValue(
        description,
        context
      )
    );
  }

}
