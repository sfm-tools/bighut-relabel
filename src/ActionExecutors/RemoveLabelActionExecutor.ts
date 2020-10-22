import { RemoveLabelAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class RemoveLabelActionExecutor extends BaseActionExecutor<RemoveLabelAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      context.updater.removeLabels.add(this.action.label);
    }
  }

}
