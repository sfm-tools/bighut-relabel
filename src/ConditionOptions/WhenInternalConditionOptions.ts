import { BaseConditionOptions } from './BaseConditionOptions';
import { WhenInternalConditionOptionsValues } from './Values';

export class WhenInternalConditionOptions extends BaseConditionOptions<WhenInternalConditionOptionsValues> {

  public ignoreOtherActions(): WhenInternalConditionOptions {
    this.values.ignoreOtherActions = true;

    return this;
  }

}
