import { RequestReviewersAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class RequestReviewersActionExecutor extends BaseActionExecutor<RequestReviewersAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      const usernames: Array<string> = this.action.getUsernames
        ? this.action.getUsernames(context)
        : this.action.usernames;

      usernames.forEach(
        context.updater.requestReviewers.add,
        context.updater.requestReviewers
      );

      this.done();
    }
  }

}
