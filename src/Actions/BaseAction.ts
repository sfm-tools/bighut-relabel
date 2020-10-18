import {
  BaseCondition,
  WhenCondition,
} from '../Conditions';
import { LabelerContext } from '../LabelerContext';

export abstract class BaseAction {

  private readonly _conditions = new Array<BaseCondition>();

  public when(predicate: { (context: LabelerContext): boolean }): BaseAction {
    return this.addCondition(
      new WhenCondition(predicate)
    );
  }

  private addCondition(condition: BaseCondition<any>): BaseAction {
    this._conditions.push(condition);

    return this;
  }

}
