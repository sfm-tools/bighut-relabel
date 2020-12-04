import { DefaultConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenContainsConflictsCondition extends BaseCondition<boolean, DefaultConditionOptions> {

  constructor(hasConflicts: boolean, options?: DefaultConditionOptions) {
    super(hasConflicts, options);
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      merged,
      mergeable,
      mergeableState,
    } = await context.pullRequest.statusInfo.get();

    if (this.predicate) {
      return this.testResult(
        (mergeable === false || mergeableState === 'dirty') && !merged,
        context
      );
    } else {
      return this.testResult(
        mergeable === true && mergeableState !== 'dirty',
        context
      );
    }
  }

}
