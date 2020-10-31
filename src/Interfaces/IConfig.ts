import { LabelerContext } from '../LabelerContext';
import { TaskFunction } from '../Types';
import { IAction } from './IAction';

export interface IConfig {

  /**
   * Adds a comment to a Pull Request.
   *
   * @param text Comment text.
   */
  addComment(text: string): IAction;

  /**
   * Adds a label to a Pull Request.
   *
   * @param label Existing in repository label to add.
   */
  addLabel(label: string): IAction;

  /**
   * Removes a label from a Pull Request.
   *
   * @param label Existing in repository label to remove from Pull Request.
   */
  removeLabel(label: string): IAction;

  /**
   * Updates title of a Pull Request.
   *
   * @param title Title to set to Pull Request.
   */
  setTitle(title: string | { (title: string, context?: LabelerContext): string }): IAction;

  /**
   * Updates description of a Pull Request.
   *
   * @param title Description to set to Pull Request.
   */
  setDescription(description: string | { (description: string, context?: LabelerContext): string }): IAction;

  /**
   * Updates milestone of a Pull Request.
   *
   * @param milestoneName Existing in repository milestone to add to Pull Request.
   * The null value is to remove the milestone from Pull Request.
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

}
