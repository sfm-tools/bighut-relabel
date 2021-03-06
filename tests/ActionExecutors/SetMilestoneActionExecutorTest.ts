import { expect } from 'chai';

import { SetMilestoneActionExecutor } from '../../src/ActionExecutors';
import { SetMilestoneAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest, flossTomUser } from '../Resources';

describe('SetMilestoneActionExecutor', () => {

  it('should add a task to set milestone', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new SetMilestoneAction('Awesome Milestone', null);
    const executor = new SetMilestoneActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(updater.milestone.value).to.equal(action.milestoneName);
  });

  it('should add a task to set milestone using function', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new SetMilestoneAction(
      (milestone: string): string => milestone || 'Awesome Milestone',
      null
    );

    const executor = new SetMilestoneActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(updater.milestone.value)
      .to
      .equal(
        action.getMilestoneName(firstPullRequest.milestone?.name, context)
      );
  });

  it('should not add a task to set milestone', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new SetMilestoneAction('Awesome Milestone', null);
    const executor = new SetMilestoneActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(updater.milestone.value).to.not.equal(action.milestoneName);
  });

});
