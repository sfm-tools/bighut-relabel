import { BaseAction } from '../Actions';
import { IAction } from '../Interfaces';
import { LabelerContext } from '../LabelerContext';
import { IActionExecutor } from './IActionExecutor';

export abstract class BaseActionExecutor<TAction extends IAction> implements IActionExecutor<TAction> {

  private readonly _action: TAction;

  private readonly _linked: IActionExecutor;

  private _executed: boolean = false;

  public get action(): TAction {
    return this._action;
  }

  public get linked(): IActionExecutor {
    return this._linked;
  }

  public get executed(): boolean {
    return this._executed;
  }

  constructor(action: TAction, linked: IActionExecutor) {
    this._action = action;
    this._linked = linked;
  }

  protected async canExecute(context: LabelerContext): Promise<boolean> {
    const action = this.action as unknown as BaseAction;

    let result: boolean = true;

    for (const condition of action.conditions) {
      result = await condition.test(context);

      if (!result) {
        break;
      }
    }

    return result;
  }

  abstract execute(context: LabelerContext): Promise<void>;

}
