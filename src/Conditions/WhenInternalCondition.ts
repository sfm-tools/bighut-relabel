import { WhenInternalConditionOptions } from '../ConditionOptions';
import { NotSupportedParameterError } from '../Errors';
import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenInternalCondition extends BaseCondition<DefaultPredicateType, WhenInternalConditionOptions> {

  constructor(options: WhenInternalConditionOptions) {
    super(undefined, options);
  }

  public test(context: LabelerContext): boolean {
    const {
      ignoreOtherActions,
      comments,
      nothing,
    } = this.getOptions(context);

    if (nothing) {
      throw new NotSupportedParameterError('nothing');
    }

    if (ignoreOtherActions) {
      context.stop(comments);
    }

    return true;
  }

}
