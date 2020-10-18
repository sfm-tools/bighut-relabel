import { BaseAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { IActionExecutor } from './IActionExecutor';

export abstract class BaseActionExecutor<TAction extends BaseAction> implements IActionExecutor<TAction> {

  private readonly _action: TAction = null;

  public get action(): TAction {
    return this._action;
  }

  constructor(action: TAction) {
    this._action = action;
  }

  protected async canExecute(context: LabelerContext): Promise<boolean> {
    let result: boolean = true;

    for (const condition of this.action['_conditions']) {
      result = await condition.test(context);

      if (!result) {
        break;
      }
    }

    return result;
  }

  abstract execute(context: LabelerContext): Promise<void>;

}
