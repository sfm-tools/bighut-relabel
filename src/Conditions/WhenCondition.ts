import { NotSupportedParameterError } from '../Errors';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';
import { WhenConditionPredicate } from './Types';

export class WhenCondition extends BaseCondition<WhenConditionPredicate> {

  public test(context: LabelerContext): boolean {
    const {
      nothing,
    } = this.getOptions();

    if (nothing) {
      throw new NotSupportedParameterError('nothing');
    }

    return this.predicate(context);
  }

}
