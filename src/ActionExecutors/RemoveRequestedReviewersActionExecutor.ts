import { RemoveRequestedReviewersAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class RemoveRequestedReviewersActionExecutor extends BaseActionExecutor<RemoveRequestedReviewersAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      const usernames: Array<string> = this.action.getUsernames
        ? this.action.getUsernames(context)
        : this.action.usernames;

      usernames.forEach(
        context.updater.removeRequestedReviewers.add,
        context.updater.removeRequestedReviewers
      );

      this.done();
    }
  }

}
