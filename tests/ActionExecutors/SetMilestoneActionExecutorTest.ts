import { expect } from 'chai';

import { SetMilestoneActionExecutor } from '../../src/ActionExecutors';
import { SetMilestoneAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { flossTomUser,pullRequests } from '../Resources';

describe('SetMilestoneActionExecutor', () => {

  it('should add a task to set milestone', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new SetMilestoneAction('Awesome Milestone', null);
    const executor = new SetMilestoneActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(updater.milestone.value).to.equal(action.milestoneName);
  });

  it('should not add a task to set milestone', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
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
