import { expect } from 'chai';

import { AddLabelActionExecutor } from '../src/ActionExecutors';
import { BaseAction } from '../src/Actions';
import {
  WhenAuthorLoginCondition,
  WhenCommentCountCondition,
  WhenCommentTextCondition,
  WhenCommitCountCondition,
  WhenCommitMessageCondition,
  WhenCondition,
  WhenContainsConflictsCondition,
  WhenContainsRequestsToReviewCondition,
  WhenDescriptionCondition,
  WhenFileContentCondition,
  WhenFileCountCondition,
  WhenFilePathCondition,
  WhenInternalCondition,
  WhenLabelCondition,
  WhenMergeDirectionCondition,
  WhenMilestoneNameCondition,
  WhenReviewStateCondition,
  WhenSourceBranchNameCondition,
  WhenStateCondition,
  WhenTargetBranchNameCondition,
  WhenTitleCondition,
} from '../src/Conditions';
import { createConfig } from '../src/Config';
import { IActionCollection } from '../src/Interfaces';
import { LabelerContext } from '../src/LabelerContext';
import { firstPullRequest, flossTomUser, secondPullRequest } from './Resources';

describe('BaseAction', () => {

  describe('when', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .when(() => true);

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .when(() => true);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .when(() => true)
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenAuthorLogin', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenAuthorLogin(flossTomUser.login);

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenAuthorLoginCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenAuthorLogin(flossTomUser.login);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenAuthorLogin(flossTomUser.login)
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenCommentCount', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommentCount();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenCommentCountCondition);
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommentCount()
        .equal((await firstPullRequest.comments.get()).length);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  describe('whenCommentText', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommentText('test');

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenCommentTextCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommentText('Well done!');

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommentText('Well done!')
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenCommitCount', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommitCount();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenCommitCountCondition);
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommitCount()
        .equal((await firstPullRequest.commits.get()).length);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  describe('whenCommitMessage', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommitMessage('awesome bug');

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenCommitMessageCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommitMessage('awesome bug');

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenCommitMessage('awesome bug')
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenDescription', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenDescription('test');

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenDescriptionCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenDescription(firstPullRequest.description);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenDescription(firstPullRequest.description)
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenDescriptionIsEmpty', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenDescriptionIsEmpty();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenDescriptionCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenDescriptionIsEmpty();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenDescriptionIsEmpty()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  describe('whenDescriptionIsNotEmpty', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenDescriptionIsNotEmpty();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenDescriptionCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenDescriptionIsNotEmpty();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenDescriptionIsNotEmpty()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenFileContent', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenFileContent('AwesomeComponent');

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenFileContentCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenFileContent('AwesomeComponent');

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenFileContent('AwesomeComponent')
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenFileCount', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenFileCount();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenFileCountCondition);
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenFileCount()
        .equal((await firstPullRequest.files.get()).length);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  describe('whenFilePath', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenFilePath(/\.cs$/);

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenFilePathCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenFilePath(/\.cs$/);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenFilePath(/\.cs$/)
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenHasConflicts', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasConflicts();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenContainsConflictsCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasConflicts();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasConflicts()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  describe('whenHasNoConflicts', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasNoConflicts();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenContainsConflictsCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasNoConflicts();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasNoConflicts()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenLabel', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenLabel(firstPullRequest.labels[0]);

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenLabelCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenLabel(firstPullRequest.labels[0]);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenLabel(firstPullRequest.labels[0])
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenMergeDirection', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenMergeDirection([{
          from: firstPullRequest.sourceBranch.name,
          to: firstPullRequest.targetBranch.name,
        }]);

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenMergeDirectionCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenMergeDirection([{
          from: firstPullRequest.sourceBranch.name,
          to: firstPullRequest.targetBranch.name,
        }]);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenMergeDirection([{
          from: firstPullRequest.sourceBranch.name,
          to: firstPullRequest.targetBranch.name,
        }])
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenMilestoneName', () => {
    const context = new LabelerContext({
      pullRequest: secondPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenMilestoneName(secondPullRequest.milestone.name);

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenMilestoneNameCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenMilestoneName(secondPullRequest.milestone.name);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenMilestoneName(secondPullRequest.milestone.name)
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenSourceBranchName', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenSourceBranchName(firstPullRequest.sourceBranch.name);

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenSourceBranchNameCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenSourceBranchName(firstPullRequest.sourceBranch.name);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenSourceBranchName(firstPullRequest.sourceBranch.name)
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenTargetBranchName', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenTargetBranchName(firstPullRequest.targetBranch.name);

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenTargetBranchNameCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenTargetBranchName(firstPullRequest.targetBranch.name);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenTargetBranchName(firstPullRequest.targetBranch.name)
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenTitle', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenTitle(firstPullRequest.title);

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenTitleCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenTitle(firstPullRequest.title);

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenTitle(firstPullRequest.title)
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenHasRequestsToReview', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasRequestsToReview();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenContainsRequestsToReviewCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasRequestsToReview();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasRequestsToReview()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  describe('whenHasNoRequestsToReview', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasNoRequestsToReview();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenContainsRequestsToReviewCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasNoRequestsToReview();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenHasNoRequestsToReview()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenNotReviewed', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenNotReviewed();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenReviewStateCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenNotReviewed();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenNotReviewed()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  describe('whenApproved', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenApproved();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenReviewStateCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenApproved();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenApproved()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenChangesRequested', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenChangesRequested();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenReviewStateCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenChangesRequested();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenChangesRequested()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  describe('whenOpen', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenOpen();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenStateCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenOpen();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenOpen()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });
  });

  describe('whenClosed', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenClosed();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenStateCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenClosed();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenClosed()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  describe('whenWasMerged', () => {
    const context = new LabelerContext({
      pullRequest: firstPullRequest,
      test: true,
    });

    it('type', (): void => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenWasMerged();

      expect(action.conditions.length).to.be.equal(1);
      expect(action.conditions[0]).to.be.instanceof(WhenStateCondition);
    });

    it('result without options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenWasMerged();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.false;
    });

    it('result with options', async(): Promise<void> => {
      const config = createConfig();
      const action = config.addLabel('test') as BaseAction;

      action
        .whenWasMerged()
        .nothing();

      const result = await action.conditions[0].test(context);

      expect(result).to.be.true;
    });
  });

  it('ignoreOthers', (): void => {
    const config = createConfig();
    const action = config.addLabel('test') as BaseAction;

    action.ignoreOthers();

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenInternalCondition);
  });

  it('then', (): void => {
    const config = createConfig();
    const action = config.addLabel('first action') as BaseAction;

    action
      .when((): boolean => true)
      .then()
      .addLabel('second action');

    expect(action.conditions.length).to.be.equal(1);
    expect(action.conditions[0]).to.be.instanceof(WhenCondition);
    expect((config as unknown as IActionCollection).actions.length).to.be.equal(2);
    expect((config as unknown as IActionCollection).actions[1]).to.be.instanceof(AddLabelActionExecutor);
  });

});
