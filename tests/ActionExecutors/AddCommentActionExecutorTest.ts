import { expect } from 'chai';

import { AddCommentActionExecutor } from '../../src/ActionExecutors';
import { AddCommentAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { flossTomUser,pullRequests } from '../Resources';

describe('AddCommentActionExecutor', () => {

  it('should add a task to comment comment', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new AddCommentAction('Awesome comment');
    const executor = new AddCommentActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(updater.addComments).to.contains(action.text);
  });

  it('should not add a task to add comment', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new AddCommentAction('Awesome comment');
    const executor = new AddCommentActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(updater.addComments).to.not.contains(action.text);
  });

});
