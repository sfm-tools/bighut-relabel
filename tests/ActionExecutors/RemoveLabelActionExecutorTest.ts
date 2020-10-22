import { expect } from 'chai';

import { RemoveLabelActionExecutor } from '../../src/ActionExecutors';
import { RemoveLabelAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { flossTomUser,pullRequests } from '../Resources';

describe('RemoveLabelActionExecutor', () => {

  it('should add an existing label to the remove list of the updater', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new RemoveLabelAction('enhancement');
    const executor = new RemoveLabelActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(Array.from(updater.removeLabels)).to.deep.equal([action.label]);
  });

  it('should not add an existing label to the remove list of the updater', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new RemoveLabelAction('enhancement');
    const executor = new RemoveLabelActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(Array.from(updater.removeLabels)).to.deep.equal([]);
  });

});
