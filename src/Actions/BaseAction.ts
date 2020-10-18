import {
  BaseCondition,
  WhenCondition,
  WhenConditionPredicate,
} from '../Conditions';
import { LabelerContext } from '../LabelerContext';

export abstract class BaseAction {

  private readonly _conditions = new Array<BaseCondition>();

  public when(predicate: WhenConditionPredicate): BaseAction {
    return this.addCondition(
      new WhenCondition(predicate)
    );
  }

  private addCondition(condition: BaseCondition<any>): BaseAction {
    this._conditions.push(condition);

    return this;
  }

}
