import { expect } from 'chai';

import { BaseAction } from '../src/Actions';
import {
  WhenAuthorLoginCondition,
  WhenCommentCountCondition,
  WhenCommentTextCondition,
  WhenCommitCountCondition,
  WhenCommitMessageCondition,
  WhenCondition,
  WhenContainsConflicts,
  WhenDescriptionCondition,
  WhenFileContentCondition,
  WhenFileCountCondition,
  WhenFilePathCondition,
  WhenInternalCondition,
  WhenLabelCondition,
  WhenMergeDirectionCondition,
  WhenMilestoneNameCondition,
  WhenSourceBranchNameCondition,
  WhenTargetBranchNameCondition,
  WhenTitleCondition,
} from '../src/Conditions';
import { createConfig } from '../src/Config';

describe('BaseAction', () => {

  it('ignoreOthers', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.ignoreOthers();

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenInternalCondition);
  });

  it('when', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.when(() => true);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenCondition);
  });

  it('whenAuthorLogin', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenAuthorLogin('username');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
  });

  it('whenCommentCount', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenCommentCount();

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenCommentCountCondition);
  });

  it('whenCommentText', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenCommentText('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenCommentTextCondition);
  });

  it('whenCommitCount', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenCommitCount();

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenCommitCountCondition);
  });

  it('whenCommitMessage', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenCommitMessage('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenCommitMessageCondition);
  });

  it('whenDescription', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenDescription('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenDescriptionCondition);
  });

  it('whenDescriptionIsEmpty', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenDescriptionIsEmpty();

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenDescriptionCondition);
  });

  it('whenDescriptionIsNotEmpty', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenDescriptionIsNotEmpty();

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenDescriptionCondition);
  });

  it('whenFileContent', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenFileContent('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenFileContentCondition);
  });

  it('whenFileCount', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenFileCount();

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenFileCountCondition);
  });

  it('whenFilePath', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenFilePath('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenFilePathCondition);
  });

  it('whenHasConflicts', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenHasConflicts();

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenContainsConflicts);
  });

  it('whenHasNoConflicts', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenHasNoConflicts();

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenContainsConflicts);
  });

  it('whenLabel', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenLabel('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenLabelCondition);
  });

  it('whenMergeDirection', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenMergeDirection([{ from: 'source', to: 'target' }]);

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenMergeDirectionCondition);
  });

  it('whenMilestoneName', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenMilestoneName('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenMilestoneNameCondition);
  });

  it('whenSourceBranchName', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenSourceBranchName('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenSourceBranchNameCondition);
  });

  it('whenTargetBranchName', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenTargetBranchName('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenTargetBranchNameCondition);
  });

  it('whenTitle', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.whenTitle('test');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenTitleCondition);
  });

});
