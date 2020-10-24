import { IConfig } from '../Interfaces';
import { TaskFunction } from '../Types';
import { BaseAction } from './BaseAction';

export class ExecuteAction extends BaseAction {

  public readonly execute: TaskFunction;

  constructor(action: TaskFunction, config: IConfig) {
    super(config);

    this.execute = action;
  }

}
