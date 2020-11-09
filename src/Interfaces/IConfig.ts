import { LabelerContext } from '../LabelerContext';
import { TaskFunction } from '../Types';
import { IAction } from './IAction';

export interface IConfig {

  /**
   * Adds a comment to a pull request.
   *
   * @param text Comment text.
   */
  addComment(text: string): IAction;

  /**
   * Adds a label to a pull request.
   *
   * @param label Existing in repository label to add.
   */
  addLabel(label: string): IAction;

  /**
   * Removes a label from a pull request.
   *
   * @param label Existing in repository label to remove from pull request.
   */
  removeLabel(label: string): IAction;

  /**
   * Updates title of a pull request.
   *
   * @param title Title to set to pull request.
   */
  setTitle(title: string | { (title: string, context?: LabelerContext): string }): IAction;

  /**
   * Updates description of a pull request.
   *
   * @param title Description to set to pull request.
   */
  setDescription(description: string | { (description: string, context?: LabelerContext): string }): IAction;

  /**
   * Updates milestone of a pull request.
   *
   * @param milestoneName Existing in repository milestone to add to pull request.
   * The null value is to remove the milestone from pull request.
   */
  setMilestone(milestoneName: string | { (milestoneName: string, context?: LabelerContext): string }): IAction;

  /**
   * Executes a custom action.
   *
   * @param action Action to execute.
   */
  execute(action: TaskFunction): IAction;

  /**
   * Doesn't take any action.
   * You can use this action in conjunction with
   * the `ignoreOtherActions()` option to disable other actions.
   */
  skip(): IAction;

  /**
   * Requests a code review from the specified users.
   */
  requestReviewers(usernames: Array<string> | { (context?: LabelerContext): Array<string> }): IAction;

  /**
   * Removes the code review request for the specified users.
   */
  removeRequestedReviewers(usernames: Array<string> | { (context?: LabelerContext): Array<string> }): IAction;

  /**
   * Deletes the specified branch. ATTENTION: This action cannot be undone!
   */
  deleteBranch(branchName: string): IAction;

}
