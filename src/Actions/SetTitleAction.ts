import { IConfig } from '../Interfaces';
import { LabelerContext } from '../LabelerContext';
import { BaseAction } from './BaseAction';

export class SetTitleAction extends BaseAction {

  public readonly title: string;

  public readonly getTitle: { (title: string, context: LabelerContext): string };

  constructor(
    title: string | { (title: string, context?: LabelerContext): string },
    config: IConfig
  ) {
    super(config);

    if (typeof title === 'function') {
      this.getTitle = title;
    } else {
      this.title = title;
    }
  }

}
