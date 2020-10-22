import { LabelerContext } from '../LabelerContext';
import { BaseAction } from './BaseAction';

export class SetDescriptionAction extends BaseAction {

  public readonly description: string;

  public readonly getDescription: { (description: string, context: LabelerContext): string };

  constructor(description: string | { (description: string, context?: LabelerContext): string }) {
    super();

    if (typeof description === 'function') {
      this.getDescription = description;
    } else {
      this.description = description;
    }
  }

}
