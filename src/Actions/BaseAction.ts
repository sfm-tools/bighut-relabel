import {
  StringConditionOptions,
  WhenFileContentConditionOptions,
  WhenFilePathConditionOptions,
} from '../ConditionOptions';
import {
  BaseCondition,
  WhenAuthorLoginCondition,
  WhenCondition,
  WhenConditionPredicate,
  WhenDescriptionCondition,
  WhenFileContentCondition,
  WhenFilePathCondition,
  WhenLabelCondition,
  WhenTitleCondition,
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
    const options = new WhenFilePathConditionOptions(this);
    const condition = new WhenFilePathCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenFileContent(predicate: DefaultPredicateType): WhenFileContentConditionOptions {
    const options = new WhenFileContentConditionOptions(this);
    const condition = new WhenFileContentCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenAuthorLogin(predicate: DefaultPredicateType): BaseAction {
    return this.addCondition(
      new WhenAuthorLoginCondition(predicate)
    );
  }

  public whenTitle(predicate: DefaultPredicateType): StringConditionOptions {
    const options = new StringConditionOptions(this);
    const condition = new WhenTitleCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenDescription(predicate: DefaultPredicateType): StringConditionOptions {
    const options = new StringConditionOptions(this);
    const condition = new WhenDescriptionCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenDescriptionIsEmpty(): StringConditionOptions {
    return this.whenDescription((value: string): boolean => !value);
  }

  public whenDescriptionIsNotEmpty(): StringConditionOptions {
    return this.whenDescription((value: string): boolean => !!value);
  }

  private addCondition(condition: BaseCondition<any>): BaseAction {
    this._conditions.push(condition);

    return this;
  }

}
