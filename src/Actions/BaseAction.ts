import {
  DefaultConditionOptions,
  WhenCommentTextConditionOptions,
  WhenFileContentConditionOptions,
  WhenFilePathConditionOptions,
  WhenInternalConditionOptions,
  WhenNumberConditionOptions,
  WhenReviewStateConditionOptions,
} from '../ConditionOptions';
import {
  BaseCondition,
  WhenAuthorLoginCondition,
  WhenCommentCountCondition,
  WhenCommentTextCondition,
  WhenCommitCountCondition,
  WhenCommitMessageCondition,
  WhenCondition,
  WhenConditionPredicate,
  WhenContainsConflicts,
  WhenDescriptionCondition,
  WhenFileContentCondition,
  WhenFileCountCondition,
  WhenFilePathCondition,
  WhenInternalCondition,
  WhenLabelCondition,
  WhenMergeDirectionCondition,
  WhenMilestoneNameCondition,
  WhenReviewStateCondition,
  WhenSourceBranchNameCondition,
  WhenTargetBranchNameCondition,
  WhenTitleCondition,
} from '../Conditions';
import { IAction, IConfig, ILinkingActions } from '../Interfaces';
import { DefaultPredicateType, MergeDirection } from '../Types';

export abstract class BaseAction implements IAction {

  public readonly conditions = new Array<BaseCondition>();

  public readonly config: IConfig | ILinkingActions = null;

  constructor(config: IConfig) {
    this.config = config;
  }

  public when(predicate: WhenConditionPredicate): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenLabel(predicate: DefaultPredicateType): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenLabelCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenFileCount(): WhenNumberConditionOptions {
    const options = new WhenNumberConditionOptions(this);
    const condition = new WhenFileCountCondition(options);

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

  public whenMilestoneName(predicate: DefaultPredicateType): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenMilestoneNameCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenTitle(predicate: DefaultPredicateType): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenTitleCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenDescription(predicate: DefaultPredicateType): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
    const condition = new WhenDescriptionCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenDescriptionIsEmpty(): DefaultConditionOptions {
    return this.whenDescription((value: string): boolean => !value);
  }

  public whenDescriptionIsNotEmpty(): DefaultConditionOptions {
    return this.whenDescription((value: string): boolean => !!value);
  }

  public whenCommentCount(): WhenNumberConditionOptions {
    const options = new WhenNumberConditionOptions(this);
    const condition = new WhenCommentCountCondition(options);

    this.addCondition(condition);

    return options;
  }

  public whenCommentText(predicate: DefaultPredicateType): WhenCommentTextConditionOptions {
    const options = new WhenCommentTextConditionOptions(this);
    const condition = new WhenCommentTextCondition(predicate, options);

    this.addCondition(condition);

    return options;
  }

  public whenCommitCount(): WhenNumberConditionOptions {
    const options = new WhenNumberConditionOptions(this);
    const condition = new WhenCommitCountCondition(options);

    this.addCondition(condition);

    return options;
  }

  public whenCommitMessage(predicate: DefaultPredicateType): DefaultConditionOptions {
    const options = new DefaultConditionOptions(this);
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

  public whenNotReviewed(): WhenReviewStateConditionOptions {
    const options = new WhenReviewStateConditionOptions(this);
    const condition = new WhenReviewStateCondition(
      'NO_REVIEW',
      options
    );

    this.addCondition(condition);

    return options;
  }

  public whenApproved(): WhenReviewStateConditionOptions {
    const options = new WhenReviewStateConditionOptions(this);
    const condition = new WhenReviewStateCondition(
      'APPROVED',
      options
    );

    this.addCondition(condition);

    return options;
  }

  public whenChangesRequested(): WhenReviewStateConditionOptions {
    const options = new WhenReviewStateConditionOptions(this);
    const condition = new WhenReviewStateCondition(
      'CHANGES_REQUESTED',
      options
    );

    this.addCondition(condition);

    return options;
  }

  public ignoreOthers(comments?: string): void {
    this.conditions.push(
      new WhenInternalCondition(
        new WhenInternalConditionOptions(
          this,
          {
            ignoreOtherActions: true,
            comments,
          }
        )
      )
    );
  }

  private addCondition(condition: BaseCondition<any>): BaseAction {
    this.conditions.push(condition);

    return this;
  }

}
