import { expect } from 'chai';

import { SkipActionExecutor } from '../../src/ActionExecutors';
import { SkipAction } from '../../src/Actions';
import { LabelerContext } from '../../src/LabelerContext';
import { flossTomUser, pullRequests } from '../Resources';

describe('SkipActionExecutor', () => {

  it('should have status executed', async(): Promise<void> => {
    const context = new LabelerContext(pullRequests[0]);
    const action = new SkipAction(null);
    const executor = new SkipActionExecutor(action, null);

    action
      .whenAuthorLogin(flossTomUser.login);

    await executor.execute(context);

    expect(executor.executed).to.be.true;
  });

});
