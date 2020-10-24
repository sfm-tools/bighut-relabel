import { AddCommentAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class AddCommentActionExecutor extends BaseActionExecutor<AddCommentAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      context.updater.addComments.push(this.action.text);
      this.done();
    }
  }

}
