import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';
import { WhenConditionPredicate } from './Types';

export class WhenCondition extends BaseCondition<WhenConditionPredicate> {

  public async test(context: LabelerContext): Promise<boolean> {
    const result = await this.predicate(context);

    return this.testResult(result, context);
  }

}
