import { DefaultConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

type PullRequestState = 'open' | 'closed' | 'merged';

export class WhenState extends BaseCondition<PullRequestState, DefaultConditionOptions> {

  constructor(state: PullRequestState, options?: DefaultConditionOptions) {
    super(state, options);
  }

  public test(context: LabelerContext): boolean {
    const {
      state,
      mergedDate,
    } = context.pullRequest;

    switch (this.predicate) {
      case 'open':
        return state === 'open';

      case 'merged':
        return !!mergedDate;

      case 'closed':
        return state === 'closed' && !mergedDate;
    }
  }

}
