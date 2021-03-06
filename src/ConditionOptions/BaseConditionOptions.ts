import { BaseAction } from '../Actions';
import { IAction, IConfig, ILinkingActions } from '../Interfaces';
import { ConditionOptionsValues } from './Values';

export abstract class BaseConditionOptions<TValues extends ConditionOptionsValues = ConditionOptionsValues> {

  private readonly _action: IAction;

  protected readonly values: TValues;

  constructor(action: IAction, defaultValues?: TValues) {
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

  public nothingAndAlso(): IAction {
    this.nothing();
    return this.andAlso();
  }

  public andAlso(): IAction {
    return this._action;
  }

  public then(): IConfig {
    const config: IConfig | ILinkingActions = (this._action as BaseAction).config;

    (config as ILinkingActions).linkingMode = true;

    return config as IConfig;
  }

}
