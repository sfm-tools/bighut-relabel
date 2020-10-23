import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenContainsConflicts extends BaseCondition<boolean> {

  constructor(hasConflicts: boolean) {
    super(hasConflicts);
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      mergeableState,
    } = await context.pullRequest.statusInfo;

    if (this.predicate) {
      return mergeableState === 'dirty';
    } else {
      return mergeableState !== 'dirty';
    }
  }

}
