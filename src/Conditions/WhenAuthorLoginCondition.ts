import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenAuthorLoginCondition extends BaseCondition {

  public test(context: LabelerContext): boolean {
    const {
      noOne,
    } = this.getOptions();

    return this.testStringValue(
      context.pullRequest.author.login,
      context
    ) && !noOne;
  }

}
