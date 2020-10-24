import {
  AddCommentActionExecutor,
  AddLabelActionExecutor,
  ExecuteActionExecutor,
  IActionExecutor,
  RemoveLabelActionExecutor,
  SetDescriptionActionExecutor,
  SetMilestoneActionExecutor,
  SetTitleActionExecutor,
} from './ActionExecutors';
import {
  AddCommentAction,
  AddLabelAction,
  BaseAction,
  ExecuteAction,
  RemoveLabelAction,
  SetDescriptionAction,
  SetMilestoneAction,
  SetTitleAction,
} from './Actions';
import {
  IAction,
  IActionCollection,
  IConfig,
  ILinkingActions,
} from './Interfaces';
import { LabelerContext } from './LabelerContext';
import { TaskFunction } from './Types';

export class Config implements IConfig, IActionCollection, ILinkingActions {

  public readonly actions = new Array<IActionExecutor>();

  public linkingMode: boolean = false;

  public addComment(text: string): IAction {
    return this.addAction(
      new AddCommentActionExecutor(
        new AddCommentAction(text, this),
        this.getLink()
      )
    );
  }

  public addLabel(label: string): IAction {
    return this.addAction(
      new AddLabelActionExecutor(
        new AddLabelAction(label, this),
        this.getLink()
      )
    );
  }

  public removeLabel(label: string): IAction {
    return this.addAction(
      new RemoveLabelActionExecutor(
        new RemoveLabelAction(label, this),
        this.getLink()
      )
    );
  }

  public setTitle(title: string | { (title: string, context?: LabelerContext): string }): IAction {
    return this.addAction(
      new SetTitleActionExecutor(
        new SetTitleAction(title, this),
        this.getLink()
      )
    );
  }

  public setDescription(description: string | { (description: string, context?: LabelerContext): string }): IAction {
    return this.addAction(
      new SetDescriptionActionExecutor(
        new SetDescriptionAction(description, this),
        this.getLink()
      )
    );
  }

  public setMilestone(milestoneName: string | { (milestoneName: string, context?: LabelerContext): string }): IAction {
    return this.addAction(
      new SetMilestoneActionExecutor(
        new SetMilestoneAction(milestoneName, this),
        this.getLink()
      )
    );
  }

  public execute(action: TaskFunction): IAction {
    return this.addAction(
      new ExecuteActionExecutor(
        new ExecuteAction(action, this),
        this.getLink()
      )
    );
  }

  private getLink(): IActionExecutor {
    return this.linkingMode
      ? this.actions[this.actions.length - 1]
      : null;
  }

  private addAction<TAction extends BaseAction, TActionExecutor extends IActionExecutor<TAction>>(executorInstance: TActionExecutor): TAction {
    this.actions.push(executorInstance);
    this.linkingMode = false;

    return executorInstance.action;
  }

}
