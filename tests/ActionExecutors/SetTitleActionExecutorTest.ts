import { expect } from 'chai';

import { SetTitleActionExecutor } from '../../src/ActionExecutors';
import { SetTitleAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { flossTomUser,pullRequests } from '../Resources';

describe('SetTitleActionExecutor', () => {

  it('should add a task to change title', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new SetTitleAction('Awesome title');
    const executor = new SetTitleActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(updater.title.value).to.equal(action.title);
  });

  it('should not add a task to change title', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new SetTitleAction('Awesome title');
    const executor = new SetTitleActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(updater.title.value).to.not.equal(action.title);
  });

});