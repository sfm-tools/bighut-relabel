import {
  StringConditionOptions,
  WhenCommentTextConditionOptions,
  WhenFileContentConditionOptions,
  WhenFilePathConditionOptions,
} from '../ConditionOptions';
import {
  BaseCondition,
  WhenAuthorLoginCondition,
  WhenCommentTextCondition,
  WhenCommitMessageCondition,
  WhenCondition,
  WhenConditionPredicate,
  WhenDescriptionCondition,
  WhenFileContentCondition,
  WhenFilePathCondition,
  WhenLabelCondition,
  WhenMergeDirectionCondition,
  WhenSourceBranchNameCondition,
  WhenTargetBranchNameCondition,
  WhenTitleCondition,
} from '../Conditions';
import { DefaultPredicateType } from '../Types';
import { MergeDirection } from './Types';

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

  public whenCommentText(predicate: DefaultPredicateType): WhenCommentTextConditionOptions {
    const options = new WhenCommentTextConditionOptions(this);
    const condition = new WhenCommentTextCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenCommitMessage(predicate: DefaultPredicateType): StringConditionOptions {
    const options = new StringConditionOptions(this);
    const condition = new WhenCommitMessageCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenSourceBranchName(predicate: DefaultPredicateType): BaseAction {
    return this.addCondition(
      new WhenSourceBranchNameCondition(predicate)
    );
  }

  public whenTargetBranchName(predicate: DefaultPredicateType): BaseAction {
    return this.addCondition(
      new WhenTargetBranchNameCondition(predicate)
    );
  }

  public whenMergeDirection(direction: Array<MergeDirection>): BaseAction {
    return this.addCondition(
      new WhenMergeDirectionCondition(direction)
    );
  }

  private addCondition(condition: BaseCondition<any>): BaseAction {
    this._conditions.push(condition);

    return this;
  }

}
