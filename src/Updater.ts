import { TaskFunction } from './Types';
import { UpdateValue } from './UpdateValue';

export class Updater {

  /**
   * List of tasks for execution.
   */
  public readonly tasks = new Array<TaskFunction>();

  /**
   * List of labels to add.
   */
  public readonly addLabels = new Set<string>();

  /**
   * List of labels to remove.
   */
  public readonly removeLabels = new Set<string>();

  /**
   * Pull Request title to update.
   */
  public readonly title = new UpdateValue<string>();

  /**
   * Pull Request description to update.
   */
  public readonly description = new UpdateValue<string>();

  /**
   * Milestone to set on the Pull Request.
   */
  public readonly milestone = new UpdateValue<string>();

  /**
   * Comments to add to the Pull Request.
   */
  public readonly addComments = new Array<string>();

}
