import { StringConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType, StringComparer } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenCommitMessageCondition extends BaseCondition<DefaultPredicateType, StringConditionOptions> {

  protected get stringComparer(): StringComparer {
    return BaseCondition.containsString;
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      noOne,
      exclude,
    } = this.getOptions();

    const commits = await context.pullRequest.commits;

    let result = false;

    for (const commit of commits) {
      const { message } = commit;

      result = this.testStringValue(message, context);

      if (result) {
        if (this.testForExcludedSting(message, context, exclude)) {
          return false;
        }

        break;
      }
    }

    return result && !noOne;
  }

}
