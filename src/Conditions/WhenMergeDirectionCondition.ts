import { MergeDirection } from '../Actions/Types';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

export class WhenMergeDirectionCondition extends BaseCondition<Array<MergeDirection>> {

  public test(context: LabelerContext): boolean {
    const {
      noOne,
    } = this.getOptions();

    for (const direction of this.predicate) {
      if (
        direction.from === context.pullRequest.sourceBranch.name
        && direction.to === context.pullRequest.targetBranch.name
      ) {
        return !noOne;
      }
    }

    return false;
  }

}
