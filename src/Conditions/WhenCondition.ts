import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

type WhenConditionPredicate = (context: LabelerContext) => boolean;

export class WhenCondition extends BaseCondition<WhenConditionPredicate> {

  constructor(predicate: WhenConditionPredicate) {
    super(predicate);
  }

  public test(context: LabelerContext): boolean {
    return this.predicate(context);
  }

}
