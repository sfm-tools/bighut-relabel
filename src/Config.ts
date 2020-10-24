import {
  AddLabelActionExecutor,
  BaseActionExecutor,
  ExecuteActionExecutor,
  RemoveLabelActionExecutor,
  SetDescriptionActionExecutor,
  SetMilestoneActionExecutor,
  SetTitleActionExecutor,
} from './ActionExecutors';
import {
  AddLabelAction,
  BaseAction,
  ExecuteAction,
  RemoveLabelAction,
  SetDescriptionAction,
  SetMilestoneAction,
  SetTitleAction,
} from './Actions';
import { LabelerContext } from './LabelerContext';
import { TaskFunction } from './Types';

export class Config {

  private _actions = new Array<BaseActionExecutor<BaseAction>>();

  public addLabel(label: string): BaseAction {
    return this.addAction(
      new AddLabelActionExecutor(
        new AddLabelAction(label)
      )
    );
  }

  public removeLabel(label: string): BaseAction {
    return this.addAction(
      new RemoveLabelActionExecutor(
        new RemoveLabelAction(label)
      )
    );
  }

  public setTitle(title: string | { (title: string, context?: LabelerContext): string }): BaseAction {
    return this.addAction(
      new SetTitleActionExecutor(
        new SetTitleAction(title)
      )
    );
  }

  public setDescription(description: string | { (description: string, context?: LabelerContext): string }): BaseAction {
    return this.addAction(
      new SetDescriptionActionExecutor(
        new SetDescriptionAction(description)
      )
    );
  }

  public setMilestone(milestoneName: string | { (milestoneName: string, context?: LabelerContext): string }): BaseAction {
    return this.addAction(
      new SetMilestoneActionExecutor(
        new SetMilestoneAction(milestoneName)
      )
    );
  }

  public execute(action: TaskFunction): ExecuteAction {
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
