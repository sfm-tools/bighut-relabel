import { DefaultConditionOptions } from '../ConditionOptions';
import { NotSupportedParameterError } from '../Errors';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenContainsConflicts extends BaseCondition<boolean, DefaultConditionOptions> {

  constructor(hasConflicts: boolean, options?: DefaultConditionOptions) {
    super(hasConflicts, options);
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      noOne,
    } = this.getOptions();

    if (noOne) {
      throw new NotSupportedParameterError('noOne');
    }

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
