import {
  AddLabelActionExecutor,
  BaseActionExecutor,
  ExecuteActionExecutor,
  RemoveLabelActionExecutor,
  SetTitleActionExecutor,
} from './ActionExecutors';
import {
  AddLabelAction,
  BaseAction,
  ExecuteAction,
  RemoveLabelAction,
  SetTitleAction,
} from './Actions';
import { LabelerContext } from './LabelerContext';

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

  public setTitle(title: string | { (title: string, context?: LabelerContext): string }): SetTitleAction {
    return this.addAction(
      new SetTitleActionExecutor(
        new SetTitleAction(title)
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
