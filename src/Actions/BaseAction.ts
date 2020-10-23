import {
  DefaultConditionOptions,
  StringConditionOptions,
  WhenCommentTextConditionOptions,
  WhenFileContentConditionOptions,
  WhenFilePathConditionOptions,
  WhenInternalConditionOptions,
} from '../ConditionOptions';
import {
  BaseCondition,
  WhenAuthorLoginCondition,
  WhenCommentTextCondition,
  WhenCommitMessageCondition,
  WhenCondition,
  WhenConditionPredicate,
  WhenContainsConflicts,
  WhenDescriptionCondition,
  WhenFileContentCondition,
  WhenFilePathCondition,
  WhenInternalCondition,
  WhenLabelCondition,
  WhenMergeDirectionCondition,
  WhenSourceBranchNameCondition,
  WhenTargetBranchNameCondition,
  WhenTitleCondition,
} from '../Conditions';
import { DefaultPredicateType, MergeDirection } from '../Types';

export abstract class BaseAction {

  private readonly _conditions = new Array<BaseCondition>();

  public when(predicate: WhenConditionPredicate): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenCondition(predicate, options);

    this.addCondition(condition);

    return options;
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

  public whenAuthorLogin(predicate: DefaultPredicateType): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenAuthorLoginCondition(predicate, options);

    this.addCondition(condition);

    return options;
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

  public whenSourceBranchName(predicate: DefaultPredicateType): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenSourceBranchNameCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenTargetBranchName(predicate: DefaultPredicateType): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenTargetBranchNameCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenMergeDirection(direction: Array<MergeDirection>): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenMergeDirectionCondition(direction, options);

    this.addCondition(condition);

    return options;
  }

  public whenHasConflicts(): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenContainsConflicts(true);

    this.addCondition(condition);

    return options;
  }

  public whenHasNoConflicts(): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenContainsConflicts(false);

    this.addCondition(condition);

    return options;
  }

  public ignoreOthers(): void {
    this._conditions.push(
      new WhenInternalCondition(
        new WhenInternalConditionOptions(
          this,
          {
            ignoreOtherActions: true
          }
        )
      )
    );
  }

  private addCondition(condition: BaseCondition<any>): BaseAction {
    this._conditions.push(condition);

    return this;
  }

}
