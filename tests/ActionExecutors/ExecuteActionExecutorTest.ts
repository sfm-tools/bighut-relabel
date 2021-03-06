import { expect } from 'chai';

import { ExecuteActionExecutor } from '../../src/ActionExecutors';
import { ExecuteAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest, flossTomUser } from '../Resources';

describe('ExecuteActionExecutor', () => {

  it('should add a task to the updater', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new ExecuteAction((): Promise<void> => Promise.resolve(), null);
    const executor = new ExecuteActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(Array.from(updater.tasks)).to.deep.equal([action.execute]);
  });

  it('should not add any tasks to the updater', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new ExecuteAction((): Promise<void> => Promise.resolve(), null);
    const executor = new ExecuteActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(Array.from(updater.tasks)).to.deep.equal([]);
  });

});
