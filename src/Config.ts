import {
  BaseActionExecutor,
  ExecuteActionExecutor,
} from './ActionExecutors';
import {
  BaseAction,
  ExecuteAction,
} from './Actions';

export abstract class Config {

  private _actions = new Array<BaseActionExecutor<BaseAction>>();

  public execute(action: VoidFunction): ExecuteAction {
    return this.addAction(
      new ExecuteActionExecutor(
        new ExecuteAction(action)
      )
    );
  }

  private addAction<TAction extends BaseAction, TActionExecutor extends BaseActionExecutor<TAction>>(executorInstance: TActionExecutor): TAction {
    this._actions.push(executorInstance);

    return executorInstance.action;
  }

}