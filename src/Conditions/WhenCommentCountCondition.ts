import { WhenNumberConditionOptions } from '../ConditionOptions';
import { testNumberConditions } from '../Helpers';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenCommentCountCondition extends BaseCondition<DefaultPredicateType, WhenNumberConditionOptions> {

  constructor(options: WhenNumberConditionOptions) {
    super(undefined, options);
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const { comments } = await context.pullRequest.statusInfo.get();

    return this.testResult(
      testNumberConditions(
        comments,
        super.getOptions(context)
      ),
      context
    );
  }

}
