import { DefaultConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenContainsConflicts extends BaseCondition<boolean, DefaultConditionOptions> {

  constructor(hasConflicts: boolean, options?: DefaultConditionOptions) {
    super(hasConflicts, options);
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      merged,
      mergeableState,
    } = await context.pullRequest.statusInfo.get();

    if (this.predicate) {
      return this.testResult(
        mergeableState === 'dirty' && !merged
      );
    } else {
      return this.testResult(
        mergeableState !== 'dirty'
      );
    }
  }

}
