import { BaseAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';

export interface IActionExecutor<TAction extends BaseAction = BaseAction> {

  readonly action: TAction;

  execute(context: LabelerContext): Promise<void>;

}
