import { UpdateValue } from './UpdateValue';

export class Updater {

  /**
   * List of labels to update.
   */
  public readonly labels = new Set<string>();

  /**
   * List of tasks for execution.
   */
  public readonly tasks = new Array<VoidFunction>();

  /**
   * Pull Request title to update.
   */
  public readonly title? = new UpdateValue<string>();

  /**
   * Pull Request description to update.
   */
  public readonly description? = new UpdateValue<string>();

}
