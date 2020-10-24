import { LabelerContext } from '../LabelerContext';
import { BaseAction } from './BaseAction';

export class SetMilestoneAction extends BaseAction {

  public readonly milestoneName: string;

  public readonly getMilestoneName: { (milestoneName: string, context: LabelerContext): string };

  constructor(milestone: string | { (milestoneName: string, context?: LabelerContext): string }) {
    super();

    if (typeof milestone === 'function') {
      this.getMilestoneName = milestone;
    } else {
      this.milestoneName = milestone;
    }
  }

}
