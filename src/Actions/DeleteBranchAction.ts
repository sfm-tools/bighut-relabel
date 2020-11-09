import { IConfig } from '../Interfaces';
import { BaseAction } from './BaseAction';

export class DeleteBranchAction extends BaseAction {

  public readonly branchName: string;

  constructor(branchName: string, config: IConfig) {
    super(config);

    this.branchName = branchName;
  }

}
