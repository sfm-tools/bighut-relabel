import { BaseAction } from './BaseAction';

export class AddCommentAction extends BaseAction {

  public readonly text: string;

  constructor(text: string) {
    super();

    this.text = text;
  }

}
