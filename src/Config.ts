import {
  AddCommentActionExecutor,
  AddLabelActionExecutor,
  DeleteBranchActionExecutor,
  ExecuteActionExecutor,
  RemoveLabelActionExecutor,
  RemoveRequestedReviewersActionExecutor,
  RequestReviewersActionExecutor,
  SetDescriptionActionExecutor,
  SetMilestoneActionExecutor,
  SetTitleActionExecutor,
  SkipActionExecutor,
} from './ActionExecutors';
import {
  AddCommentAction,
  AddLabelAction,
  BaseAction,
  DeleteBranchAction,
  ExecuteAction,
  RemoveLabelAction,
  RemoveRequestedReviewersAction,
  RequestReviewersAction,
  SetDescriptionAction,
  SetMilestoneAction,
  SetTitleAction,
  SkipAction,
} from './Actions';
import {
  IAction,
  IActionCollection,
  IActionExecutor,
  IConfig,
  ILinkingActions,
} from './Interfaces';
import { LabelerContext } from './LabelerContext';
import { TaskFunction } from './Types';

class Config implements IConfig, IActionCollection, ILinkingActions {

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

  public skip(): IAction {
    return this.addAction(
      new SkipActionExecutor(
        new SkipAction(this),
        this.getLink()
      )
    );
  }

  public requestReviewers(usernames: Array<string> | { (context?: LabelerContext): Array<string> }): IAction {
    return this.addAction(
      new RequestReviewersActionExecutor(
        new RequestReviewersAction(usernames, this),
        this.getLink()
      )
    );
  }

  public removeRequestedReviewers(usernames: Array<string> | { (context?: LabelerContext): Array<string> }): IAction {
    return this.addAction(
      new RemoveRequestedReviewersActionExecutor(
        new RemoveRequestedReviewersAction(usernames, this),
        this.getLink()
      )
    );
  }

  public deleteBranch(branchName: string): IAction {
    return this.addAction(
      new DeleteBranchActionExecutor(
        new DeleteBranchAction(branchName, this),
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

/**
 * Creates a new config instance.
 */
export function createConfig(): IConfig {
  return new Config();
}
