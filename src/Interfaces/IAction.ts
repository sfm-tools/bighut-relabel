import {
  DefaultConditionOptions,
  WhenCommentTextConditionOptions,
  WhenFileContentConditionOptions,
  WhenFilePathConditionOptions,
  WhenNumberConditionOptions,
  WhenReviewStateConditionOptions,
} from '../ConditionOptions';
import {
  WhenConditionPredicate,
} from '../Conditions';
import { DefaultPredicateType, MergeDirection } from '../Types';

export interface IAction {

  /**
   * Custom condition.
   */
  when(predicate: WhenConditionPredicate): DefaultConditionOptions;

  /**
   * Checks for labels in pull request.
   */
  whenLabel(predicate: DefaultPredicateType): DefaultConditionOptions;

  /**
   * Checks the number of changed files in pull request.
   */
  whenFileCount(): WhenNumberConditionOptions;

  /**
   * Checks for at least one match in the paths of pull request files.
   */
  whenFilePath(predicate: DefaultPredicateType): WhenFilePathConditionOptions;

  /**
   *Checks the content of pull request files.
   */
  whenFileContent(predicate: DefaultPredicateType): WhenFileContentConditionOptions;

  /**
   * Checks the username of the author of pull request.
   */
  whenAuthorLogin(predicate: DefaultPredicateType): DefaultConditionOptions;

  /**
   * Checks the milestone name of pull request.
   */
  whenMilestoneName(predicate: DefaultPredicateType): DefaultConditionOptions;

  /**
   * Checks for the presence of the specified substring in the title of a pull request,
   * or for matching title with the specified conditions.
   */
  whenTitle(predicate: DefaultPredicateType): DefaultConditionOptions;

  /**
   * Checks for the presence of the specified substring in the description of a pull request,
   * or for matching description with the specified conditions.
   */
  whenDescription(predicate: DefaultPredicateType): DefaultConditionOptions;

  /**
   * Checks that a description of a pull request is empty.
   */
  whenDescriptionIsEmpty(): DefaultConditionOptions;

  /**
   * Checks that a description of a pull request is not empty.
   */
  whenDescriptionIsNotEmpty(): DefaultConditionOptions;

  /**
   * Checks the number of comments for a pull request.
   */
  whenCommentCount(): WhenNumberConditionOptions;

  /**
   * Checks whether the text of pull request comments contains the specified substring,
   * or whether the text of the comment matches the specified conditions.
   */
  whenCommentText(predicate: DefaultPredicateType): WhenCommentTextConditionOptions;

  /**
   * Checks the number of commits for a pull request.
   */
  whenCommitCount(): WhenNumberConditionOptions;

  /**
   * Checks whether the text of pull request commits contains the specified substring,
   * or whether the text of the commits matches the specified conditions.
   */
  whenCommitMessage(predicate: DefaultPredicateType): DefaultConditionOptions;

  /**
   * Checks the name of the source branch.
   */
  whenSourceBranchName(predicate: DefaultPredicateType): DefaultConditionOptions;

  /**
   * Checks the name of the target branch.
   */
  whenTargetBranchName(predicate: DefaultPredicateType): DefaultConditionOptions;

  /**
   * Checks the direction of the merge. Searches for at least one match.
   */
  whenMergeDirection(direction: Array<MergeDirection>): DefaultConditionOptions;

  /**
   * Checks for conflicts in a pull request.
   */
  whenHasConflicts(): DefaultConditionOptions;

  /**
   * Checks for conflicts in a pull request.
   */
  whenHasNoConflicts(): DefaultConditionOptions;

  /**
   * Checks that a pull request was not reviewed
   * (has no code review comments, has not been approved or requested changes).
   */
  whenNotReviewed(): WhenReviewStateConditionOptions;

  /**
   * Checks that a pull request is approved.
   */
  whenApproved(): WhenReviewStateConditionOptions;

  /**
   * Checks the requested changes for a pull request.
   */
  whenChangesRequested(): WhenReviewStateConditionOptions;

  /**
   * Checks that a pull request is in the Open state.
   */
  whenOpen(): DefaultConditionOptions;

  /**
   * Prohibits any other action if the current one meets all the conditions.
   */
  ignoreOthers(comments?: string): void;

}
