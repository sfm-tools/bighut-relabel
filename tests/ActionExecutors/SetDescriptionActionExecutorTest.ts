import { expect } from 'chai';

import { SetDescriptionActionExecutor } from '../../src/ActionExecutors';
import { SetDescriptionAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { flossTomUser,pullRequests } from '../Resources';

describe('SetDescriptionActionExecutor', () => {

  it('should add a task to change description', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new SetDescriptionAction('Awesome description');
    const executor = new SetDescriptionActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(updater.description.value).to.equal(action.description);
  });

  it('should not add a task to change description', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new SetDescriptionAction('Awesome description');
    const executor = new SetDescriptionActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(updater.description.value).to.not.equal(action.description);
  });

});