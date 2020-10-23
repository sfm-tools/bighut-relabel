import { BaseAction } from '../Actions';
import { ConditionOptionsValues } from './Values';

export abstract class BaseConditionOptions<TValues extends ConditionOptionsValues = ConditionOptionsValues> {

  private readonly _action: BaseAction;

  protected readonly values: TValues;

  constructor(action: BaseAction, defaultValues?: TValues) {
    this._action = action;
    this.values = defaultValues || {} as TValues;
  }

  public noOne(): BaseConditionOptions<TValues> {
    if (this.values.noOne) {
      console.warn('The noOne option is already in use.');
    }

    this.values.noOne = true;

    return this;
  }

  public andAlso(): BaseAction {
    return this._action;
  }

}
