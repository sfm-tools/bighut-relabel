import { LabelerContext } from '../LabelerContext';
import { StringComparer } from '../Types';
import { BaseCondition } from './BaseCondition';

export class WhenCommitMessageCondition extends BaseCondition {

  protected get stringComparer(): StringComparer {
    return BaseCondition.containsString;
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const commits = await context.pullRequest.commits.get();

    let result = false;

    for (const commit of commits) {
      const { message } = commit;

      result = this.testStringValue(message, context);

      if (result) {
        break;
      }
    }

    return this.testResult(result);
  }

}
