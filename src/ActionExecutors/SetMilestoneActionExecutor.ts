import { SetMilestoneAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class SetMilestoneActionExecutor extends BaseActionExecutor<SetMilestoneAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      context.updater.milestone.value = this.action.getMilestoneName
        ? this.action.getMilestoneName(context.pullRequest.milestone?.name ?? null, context)
        : this.action.milestoneName;
    }
  }

}
