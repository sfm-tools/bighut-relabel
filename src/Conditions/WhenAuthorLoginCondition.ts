import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenAuthorLoginCondition extends BaseCondition {

  public test(context: LabelerContext): boolean {
    return this.testResult(
      this.testStringValue(
        context.pullRequest.author.login,
        context
      ),
      context
    );
  }

}
