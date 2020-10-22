import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';
import { WhenConditionPredicate } from './Types';

export class WhenCondition extends BaseCondition<WhenConditionPredicate> {

  public test(context: LabelerContext): boolean {
    return this.predicate(context);
  }

}
