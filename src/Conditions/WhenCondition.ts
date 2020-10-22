import { NotSupportedParameterError } from '../Errors';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';
import { WhenConditionPredicate } from './Types';

export class WhenCondition extends BaseCondition<WhenConditionPredicate> {

  public test(context: LabelerContext): boolean {
    const {
      noOne,
    } = this.getOptions();

    if (noOne) {
      throw new NotSupportedParameterError('noOne');
    }

    return this.predicate(context);
  }

}
