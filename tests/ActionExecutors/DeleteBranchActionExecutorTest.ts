import { expect } from 'chai';

import { DeleteBranchActionExecutor } from '../../src/ActionExecutors';
import { DeleteBranchAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest } from '../Resources';

describe('DeleteBranchActionExecutor', () => {

  it('should add a branch to the remove list of the updater', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new DeleteBranchAction(firstPullRequest.sourceBranch.name, null);
    const executor = new DeleteBranchActionExecutor(action, null);

    await executor.execute(context);

    expect(Array.from(updater.deleteBranches))
      .to.deep.equal([firstPullRequest.sourceBranch.name]);
  });

});
