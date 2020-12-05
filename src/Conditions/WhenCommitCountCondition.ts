import { WhenNumberConditionOptions } from '../ConditionOptions';
import { testNumberConditions } from '../Helpers';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenCommitCountCondition extends BaseCondition<DefaultPredicateType, WhenNumberConditionOptions> {

  constructor(options: WhenNumberConditionOptions) {
    super(undefined, options);
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const { commits } = await context.pullRequest.statusInfo.get();

    return this.testResult(
      testNumberConditions(
        commits,
        super.getOptions(context)
      ),
      context
    );
  }

}
