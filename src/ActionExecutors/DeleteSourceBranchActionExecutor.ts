import { DeleteSourceBranchAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class DeleteSourceBranchActionExecutor extends BaseActionExecutor<DeleteSourceBranchAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      context.updater.deleteBranches.add(
        context.pullRequest.sourceBranch.name
      );
      this.done();
    }
  }

}
