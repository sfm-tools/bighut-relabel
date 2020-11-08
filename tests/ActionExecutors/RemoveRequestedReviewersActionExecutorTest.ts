import { expect } from 'chai';

import { RemoveRequestedReviewersActionExecutor } from '../../src/ActionExecutors';
import { RemoveRequestedReviewersAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { msSoftLoUser, noReviewPullRequest } from '../Resources';

describe('RemoveRequestedReviewersActionExecutor', () => {

  it('should add a task to remove code review requests', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new RemoveRequestedReviewersAction([msSoftLoUser.login], null);
    const executor = new RemoveRequestedReviewersActionExecutor(action, null);

    action.whenNotReviewed();

    await executor.execute(context);

    expect(Array.from(updater.removeRequestedReviewers)).to.deep.equal([msSoftLoUser.login]);
  });

  it('should add a task to remove code review requests using function', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new RemoveRequestedReviewersAction(
      (): Array<string> => [msSoftLoUser.login],
      null
    );

    const executor = new RemoveRequestedReviewersActionExecutor(action, null);

    action.whenNotReviewed();

    await executor.execute(context);

    expect(Array.from(updater.removeRequestedReviewers)).to.deep.equal([msSoftLoUser.login]);
  });

});
