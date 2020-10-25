import { SkipAction } from '../Actions';
import { LabelerContext } from '../LabelerContext';
import { BaseActionExecutor } from './BaseActionExecutor';

export class SkipActionExecutor extends BaseActionExecutor<SkipAction> {

  public execute(context: LabelerContext): Promise<void> {
    this.done();

    return Promise.resolve();
  }

}
