import { BaseAction } from '../Actions';
import { IAction } from '../Interfaces';
import { LabelerContext } from '../LabelerContext';

export interface IActionExecutor<TAction extends IAction = BaseAction> {

  readonly action: TAction;

  readonly linked: IActionExecutor;

  readonly executed: boolean;

  execute(context: LabelerContext): Promise<void>;

}
