import { BaseAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';

export interface IActionExecutor<TAction extends BaseAction = BaseAction> {

  readonly action: TAction;

  readonly executed: boolean;

  execute(context: LabelerContext): Promise<void>;

}
