import { BaseAction } from './BaseAction';

export class AddLabelAction extends BaseAction {

  public readonly label: string;

  constructor(label: string) {
    super();

    this.label = label;
  }

}
