import { IConfig } from '../Interfaces';
import { BaseAction } from './BaseAction';

export class RemoveLabelAction extends BaseAction {

  public readonly label: string;

  constructor(label: string, config: IConfig) {
    super(config);

    this.label = label;
  }

}
