import { TaskFunction } from '../Types';
import { BaseAction } from './BaseAction';

export class ExecuteAction extends BaseAction {

  public readonly execute: TaskFunction;

  constructor(action: TaskFunction) {
    super();

    this.execute = action;
  }

}
