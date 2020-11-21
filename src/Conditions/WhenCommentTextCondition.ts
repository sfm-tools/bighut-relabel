import { WhenCommentTextConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType, StringComparer } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenCommentTextCondition extends BaseCondition<DefaultPredicateType, WhenCommentTextConditionOptions> {

  protected get stringComparer(): StringComparer {
    return BaseCondition.containsString;
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      authorLogin,
      creationDateRange,
    } = this.getOptions(context);

    const comments = await context.pullRequest.comments.get();

    let result = false;

    for (const comment of comments) {
      const {
        text,
        author,
        createdDate,
      } = comment;

      result = this.testStringValue(text, context);

      if (result && authorLogin && author.login !== authorLogin) {
        result = false;
      }

      if (result && creationDateRange) {
        if (creationDateRange.from && creationDateRange.from > createdDate) {
          result = false;
        }

        if (result && creationDateRange.to && creationDateRange.to < createdDate) {
          result = false;
        }
      }

      if (result) {
        break;
      }
    }

    return this.testResult(result, context);
  }

}
