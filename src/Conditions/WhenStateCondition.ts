import { DefaultConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

type PullRequestState = 'open' | 'closed' | 'merged';

export class WhenStateCondition extends BaseCondition<PullRequestState, DefaultConditionOptions> {

  constructor(state: PullRequestState, options?: DefaultConditionOptions) {
    super(state, options);
  }

  public test(context: LabelerContext): boolean {
    const {
      state,
      mergedDate,
    } = context.pullRequest;

    let result = false;

    switch (this.predicate) {
      case 'open':
        result = state === 'open';
        break;

      case 'merged':
        result = !!mergedDate;
        break;

      case 'closed':
        result = state === 'closed' && !mergedDate;
        break;
    }

    return this.testResult(result, context);
  }

}
