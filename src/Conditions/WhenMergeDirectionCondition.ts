import { LabelerContext } from '../LabelerContext';
import { MergeDirection } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenMergeDirectionCondition extends BaseCondition<Array<MergeDirection>> {

  public test(context: LabelerContext): boolean {
    const {
      nothing,
    } = this.getOptions(context);

    for (const direction of this.predicate) {
      if (
        direction.from === context.pullRequest.sourceBranch.name
        && direction.to === context.pullRequest.targetBranch.name
      ) {
        return !nothing;
      }
    }

    return false;
  }

}
