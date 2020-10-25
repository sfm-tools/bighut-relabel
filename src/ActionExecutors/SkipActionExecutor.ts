import { SkipAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class SkipActionExecutor extends BaseActionExecutor<SkipAction> {

  public async execute(context: LabelerContext): Promise<void> {
    await this.canExecute(context);
    this.done();
  }

}
