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
      noOne,
    } = this.getOptions();

    if (noOne) {
      throw new NotSupportedParameterError('noOne');
    }

    if (ignoreOtherActions) {
      context.stop();
    }

    return true;
  }

}
