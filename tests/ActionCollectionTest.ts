import { expect } from 'chai';

import {
  AddCommentActionExecutor,
  AddLabelActionExecutor,
  ExecuteActionExecutor,
  RemoveLabelActionExecutor,
  SetDescriptionActionExecutor,
  SetMilestoneActionExecutor,
  SetTitleActionExecutor,
  SkipActionExecutor,
} from '../src/ActionExecutors';
import { BaseAction } from '../src/Actions';
import { WhenAuthorLoginCondition } from '../src/Conditions';
import { createConfig } from '../src/Config';
import { IActionCollection } from '../src/Interfaces';

describe('IActionCollection', () => {
  it('should return true when contains the add label action', (): void => {
    const config = createConfig();
    const { actions } = config as unknown as IActionCollection;
    const action = config.addLabel('test') as BaseAction;

    action.whenAuthorLogin('username');

    expect(actions.length).to.be.equal(1);
    expect(actions[0]).to.be.instanceof(AddLabelActionExecutor);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
  });

  it('should return true when contains the add comment action', (): void => {
    const config = createConfig();
    const { actions } = config as unknown as IActionCollection;
    const action = config.addComment('test') as BaseAction;

    action.whenAuthorLogin('username');

    expect(actions.length).to.be.equal(1);
    expect(actions[0]).to.be.instanceof(AddCommentActionExecutor);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
  });

  it('should return true when contains the remove label action', (): void => {
    const config = createConfig();
    const { actions } = config as unknown as IActionCollection;
    const action = config.removeLabel('test') as BaseAction;

    action.whenAuthorLogin('username');

    expect(actions.length).to.be.equal(1);
    expect(actions[0]).to.be.instanceof(RemoveLabelActionExecutor);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
  });

  it('should return true when contains the set description action', (): void => {
    const config = createConfig();
    const { actions } = config as unknown as IActionCollection;
    const action = config.setDescription('test') as BaseAction;

    action.whenAuthorLogin('username');

    expect(actions.length).to.be.equal(1);
    expect(actions[0]).to.be.instanceof(SetDescriptionActionExecutor);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
  });

  it('should return true when contains the set title action', (): void => {
    const config = createConfig();
    const { actions } = config as unknown as IActionCollection;
    const action = config.setTitle('test') as BaseAction;

    action.whenAuthorLogin('username');

    expect(actions.length).to.be.equal(1);
    expect(actions[0]).to.be.instanceof(SetTitleActionExecutor);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
  });

  it('should return true when contains the set milestone action', (): void => {
    const config = createConfig();
    const { actions } = config as unknown as IActionCollection;
    const action = config.setMilestone('test') as BaseAction;

    action.whenAuthorLogin('username');

    expect(actions.length).to.be.equal(1);
    expect(actions[0]).to.be.instanceof(SetMilestoneActionExecutor);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
  });

  it('should return true when contains the execute action', (): void => {
    const config = createConfig();
    const { actions } = config as unknown as IActionCollection;
    const action = config.execute(() => Promise.resolve()) as BaseAction;

    action.whenAuthorLogin('username');

    expect(actions.length).to.be.equal(1);
    expect(actions[0]).to.be.instanceof(ExecuteActionExecutor);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
  });

  it('should return true when contains the skip action', (): void => {
    const config = createConfig();
    const { actions } = config as unknown as IActionCollection;
    const action = config.skip() as BaseAction;

    action.whenAuthorLogin('username');

    expect(actions.length).to.be.equal(1);
    expect(actions[0]).to.be.instanceof(SkipActionExecutor);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
  });
});
