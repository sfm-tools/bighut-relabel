import { expect } from 'chai';

import { DeleteSourceBranchActionExecutor } from '../../src/ActionExecutors';
import { DeleteSourceBranchAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('DeleteSourceBranchActionExecutor', () => {

  it('should add a source branch to the remove list of the updater', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new DeleteSourceBranchAction(null);
    const executor = new DeleteSourceBranchActionExecutor(action, null);

    await executor.execute(context);

    expect(Array.from(updater.deleteBranches))
      .to.deep.equal([firstPullRequest.sourceBranch.name]);
  });

});
