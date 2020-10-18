import {
  StringConditionOptions,
} from '../ConditionOptions';
import {
  BaseCondition,
  WhenCondition,
  WhenConditionPredicate,
  WhenLabelCondition,
} from '../Conditions';
import { DefaultPredicateType } from '../Types';

export abstract class BaseAction {

  private readonly _conditions = new Array<BaseCondition>();

  public when(predicate: WhenConditionPredicate): BaseAction {
    return this.addCondition(
      new WhenCondition(predicate)
    );
  }

  public whenLabel(predicate: DefaultPredicateType): StringConditionOptions {
    const options = new StringConditionOptions(this);
    const condition = new WhenLabelCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  private addCondition(condition: BaseCondition<any>): BaseAction {
    this._conditions.push(condition);

    return this;
  }

}
