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

    if (exclude?.length) {
      for (const { message } of commits) {
        if (this.testForExcludedSting(message, context, exclude)) {
          return false;
        }
      }
    }

    let result = false;

    for (const commit of commits) {
      const { message } = commit;

      result = this.testStringValue(message, context);

      if (result) {
        break;
      }
    }

    return result && !noOne;
  }

}
