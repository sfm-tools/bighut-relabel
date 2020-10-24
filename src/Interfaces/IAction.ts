import {
  DefaultConditionOptions,
  WhenCommentTextConditionOptions,
  WhenFileContentConditionOptions,
  WhenFilePathConditionOptions,
} from '../ConditionOptions';
import {
  WhenConditionPredicate,
} from '../Conditions';
import { DefaultPredicateType, MergeDirection } from '../Types';

export interface IAction {

  when(predicate: WhenConditionPredicate): DefaultConditionOptions;

  whenLabel(predicate: DefaultPredicateType): DefaultConditionOptions;

  whenFilePath(predicate: DefaultPredicateType): WhenFilePathConditionOptions;

  whenFileContent(predicate: DefaultPredicateType): WhenFileContentConditionOptions;

  whenAuthorLogin(predicate: DefaultPredicateType): DefaultConditionOptions;

  whenTitle(predicate: DefaultPredicateType): DefaultConditionOptions;

  whenDescription(predicate: DefaultPredicateType): DefaultConditionOptions;

  whenDescriptionIsEmpty(): DefaultConditionOptions;

  whenDescriptionIsNotEmpty(): DefaultConditionOptions;

  whenCommentText(predicate: DefaultPredicateType): WhenCommentTextConditionOptions;

  whenCommitMessage(predicate: DefaultPredicateType): DefaultConditionOptions;

  whenSourceBranchName(predicate: DefaultPredicateType): DefaultConditionOptions;

  whenTargetBranchName(predicate: DefaultPredicateType): DefaultConditionOptions;

  whenMergeDirection(direction: Array<MergeDirection>): DefaultConditionOptions;

  whenHasConflicts(): DefaultConditionOptions;

  whenHasNoConflicts(): DefaultConditionOptions;

  ignoreOthers(): void;

}
