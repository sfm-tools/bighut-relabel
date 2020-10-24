import { IConfig } from '../Interfaces';
import { BaseAction } from './BaseAction';

export class AddCommentAction extends BaseAction {

  public readonly text: string;

  constructor(text: string, config: IConfig) {
    super(config);

    this.text = text;
  }

}
