import { expect } from 'chai';

import { AddLabelActionExecutor } from '../../src/ActionExecutors';
import { AddLabelAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { flossTomUser,pullRequests } from '../Resources';

describe('AddLabelActionExecutor', () => {

  it('should add a label to the updater', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new AddLabelAction('awesome label');
    const executor = new AddLabelActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(Array.from(updater.labels)).to.deep.equal([action.label]);
  });

  it('should not add any labels to updater', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const updater = context.updater;
    const action = new AddLabelAction('awesome label');
    const executor = new AddLabelActionExecutor(action);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(Array.from(updater.labels)).to.deep.equal([]);
  });

});
