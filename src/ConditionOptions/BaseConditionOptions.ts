import { BaseAction } from '../Actions';
import { ConditionOptionsValues } from './Values';

export abstract class BaseConditionOptions<TValues extends ConditionOptionsValues = ConditionOptionsValues> {

  private readonly _action: BaseAction;

  protected readonly values: TValues;

  constructor(action: BaseAction, defaultValues?: TValues) {
    this._action = action;
    this.values = defaultValues || {} as TValues;
  }

  public nothing(): BaseConditionOptions<TValues> {
    if (this.values.nothing) {
      console.warn('The "nothing" option is already in use.');
    }

    this.values.nothing = true;

    return this;
  }

  public andAlso(): BaseAction {
    return this._action;
  }

}
