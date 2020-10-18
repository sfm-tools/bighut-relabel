import { ExecuteAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class ExecuteActionExecutor extends BaseActionExecutor<ExecuteAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      context.updater.tasks.push(this.action.execute);
    }
  }

}
