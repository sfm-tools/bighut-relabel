import { expect } from 'chai';

import { RequestReviewersActionExecutor } from '../../src/ActionExecutors';
import { RequestReviewersAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { msSoftLoUser, noReviewPullRequest } from '../Resources';

describe('RequestReviewersActionExecutor', () => {

  it('should add a task to request code review', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new RequestReviewersAction([msSoftLoUser.login], null);
    const executor = new RequestReviewersActionExecutor(action, null);

    action.whenNotReviewed();

    await executor.execute(context);

    expect(Array.from(updater.requestReviewers)).to.deep.equal([msSoftLoUser.login]);
  });

  it('should add a task to request code review using function', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: noReviewPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new RequestReviewersAction(
      (): Array<string> => [msSoftLoUser.login],
      null
    );

    const executor = new RequestReviewersActionExecutor(action, null);

    action.whenNotReviewed();

    await executor.execute(context);

    expect(Array.from(updater.requestReviewers)).to.deep.equal([msSoftLoUser.login]);
  });

});
