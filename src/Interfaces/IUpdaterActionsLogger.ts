export interface IUpdaterActionsLogger {

  /**
   * Logs information about the action to be taken.
   */
  action(message: string, ...meta: Array<any>): void;

}
