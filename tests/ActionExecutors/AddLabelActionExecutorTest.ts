import { expect } from 'chai';

import { AddLabelActionExecutor } from '../../src/ActionExecutors';
import { AddLabelAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { firstPullRequest, flossTomUser } from '../Resources';

describe('AddLabelActionExecutor', () => {

  it('should add a label to the updater', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new AddLabelAction('awesome label', null);
    const executor = new AddLabelActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(Array.from(updater.addLabels)).to.deep.equal([action.label]);
  });

  it('should not add any labels to updater', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new AddLabelAction('awesome label', null);
    const executor = new AddLabelActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login)
      .andAlso()
      .whenDescription('abracadabra');

    await executor.execute(context);

    expect(Array.from(updater.addLabels)).to.deep.equal([]);
  });

  it('should not add any labels to updater when the request contains an excluded label', async(): Promise<void> => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    const updater = context.updater;
    const action = new AddLabelAction('awesome label', null);
    const executor = new AddLabelActionExecutor(action, null);

    action
      .whenLabel('invalid')
      .nothingAndAlso()
      .whenLabel('fix')
      .nothingAndAlso()
      .whenLabel('ui')
      .nothing();

    await executor.execute(context);

    expect(Array.from(updater.addLabels)).to.deep.equal([]);
  });

});
