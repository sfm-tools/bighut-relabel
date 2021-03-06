import { expect } from 'chai';

import { RemoveLabelActionExecutor } from '../../src/ActionExecutors';
import { RemoveLabelAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest, flossTomUser } from '../Resources';

describe('RemoveLabelActionExecutor', () => {

  it('should add an existing label to the remove list of the updater', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new RemoveLabelAction('enhancement', null);
    const executor = new RemoveLabelActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(Array.from(updater.removeLabels)).to.deep.equal([action.label]);
  });

  it('should not add an existing label to the remove list of the updater', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new RemoveLabelAction('enhancement', null);
    const executor = new RemoveLabelActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(Array.from(updater.removeLabels)).to.deep.equal([]);
  });

});
