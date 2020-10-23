import {
  AddLabelActionExecutor,
  BaseActionExecutor,
  ExecuteActionExecutor,
  RemoveLabelActionExecutor,
} from './ActionExecutors';
import {
  AddLabelAction,
  BaseAction,
  ExecuteAction,
  RemoveLabelAction,
} from './Actions';

export class Config {

  private _actions = new Array<BaseActionExecutor<BaseAction>>();

  public addLabel(label: string): AddLabelAction {
    return this.addAction(
      new AddLabelActionExecutor(
        new AddLabelAction(label)
      )
    );
  }

  public removeLabel(label: string): RemoveLabelAction {
    return this.addAction(
      new RemoveLabelActionExecutor(
        new RemoveLabelAction(label)
      )
    );
  }

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
