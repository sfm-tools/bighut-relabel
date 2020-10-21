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
      noOne,
      exclude,
      authorLogin,
      creationDateRange,
    } = this.getOptions();

    const comments = await context.pullRequest.comments;

    let result = false;

    if (exclude?.length) {
      for (const { text } of comments) {
        if (this.testForExcludedSting(text, context, exclude)) {
          return false;
        }
      }
    }

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

    return result && !noOne;
  }

}
