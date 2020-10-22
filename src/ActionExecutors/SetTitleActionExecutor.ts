import { SetTitleAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class SetTitleActionExecutor extends BaseActionExecutor<SetTitleAction> {

  public async execute(context: LabelerContext): Promise<void> {
    if (await this.canExecute(context)) {
      context.updater.title.value = this.action.getTitle
        ? this.action.getTitle(context.pullRequest.title, context)
        : this.action.title;
    }
  }

}
