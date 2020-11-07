import { expect } from 'chai';

import { SetTitleActionExecutor } from '../../src/ActionExecutors';
import { SetTitleAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest, flossTomUser } from '../Resources';

describe('SetTitleActionExecutor', () => {

  it('should add a task to change title', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new SetTitleAction('Awesome title', null);
    const executor = new SetTitleActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(updater.title.value).to.equal(action.title);
  });

  it('should not add a task to change title', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new SetTitleAction('Awesome title', null);
    const executor = new SetTitleActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(updater.title.value).to.not.equal(action.title);
  });

});
