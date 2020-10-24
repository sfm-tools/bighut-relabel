import { SetDescriptionAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class SetDescriptionActionExecutor extends BaseActionExecutor<SetDescriptionAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      context.updater.description.value = this.action.getDescription
        ? this.action.getDescription(context.pullRequest.description, context)
        : this.action.description;

      this.done();
    }
  }

}
