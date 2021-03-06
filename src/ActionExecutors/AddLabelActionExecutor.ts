import { AddLabelAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class AddLabelActionExecutor extends BaseActionExecutor<AddLabelAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      context.updater.addLabels.add(this.action.label);
      this.done();
    }
  }

}
