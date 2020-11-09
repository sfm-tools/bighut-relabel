import { DeleteBranchAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class DeleteBranchActionExecutor extends BaseActionExecutor<DeleteBranchAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      context.updater.deleteBranches.add(this.action.branchName);
      this.done();
    }
  }

}
