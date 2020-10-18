import {
  StringConditionOptions,
  WhenFilePathConditionOptions,
} from '../ConditionOptions';
import {
  BaseCondition,
  WhenCondition,
  WhenConditionPredicate,
  WhenFilePathCondition,
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

  public whenFilePath(predicate: DefaultPredicateType): WhenFilePathConditionOptions {
    this.addCondition(
      new WhenFilePathCondition(predicate)
    );

    return new WhenFilePathConditionOptions(this);
  }

  private addCondition(condition: BaseCondition<any>): BaseAction {
    this._conditions.push(condition);

    return this;
  }

}
