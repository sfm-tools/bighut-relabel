import { BaseAction } from './BaseAction';

export class ExecuteAction extends BaseAction {

  public readonly execute: VoidFunction;

  constructor(action: VoidFunction) {
    super();

    this.execute = action;
  }

}
