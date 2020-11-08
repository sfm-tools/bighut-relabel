import { IConfig } from '../Interfaces';
import { LabelerContext } from '../LabelerContext';
import { BaseAction } from './BaseAction';

export class RequestReviewersAction extends BaseAction {

  public readonly usernames: Array<string>;

  public readonly getUsernames: { (context: LabelerContext): Array<string> };

  constructor(
    usernames: Array<string> | { (context?: LabelerContext): Array<string> },
    config: IConfig
  ) {
    super(config);

    if (typeof usernames === 'function') {
      this.getUsernames = usernames;
    } else {
      this.usernames = usernames;
    }
  }

}
