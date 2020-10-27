import { BaseConditionOptions } from './BaseConditionOptions';
import { NumberConditionOptionsValues } from './Values';

export class WhenFileCountConditionOptions extends BaseConditionOptions<NumberConditionOptionsValues> {

  public equal(value: number): WhenFileCountConditionOptions {
    this.values.equal = value;

    return this;
  }

  public greaterThan(value: number): WhenFileCountConditionOptions {
    this.values.greaterThan = value;

    return this;
  }

  public greaterThanOrEqualTo(value: number): WhenFileCountConditionOptions {
    this.values.greaterThanOrEqualTo = value;

    return this;
  }

  public lessThan(value: number): WhenFileCountConditionOptions {
    this.values.lessThan = value;

    return this;
  }

  public lessThanOrEqualTo(value: number): WhenFileCountConditionOptions {
    this.values.lessThanOrEqualTo = value;

    return this;
  }

}
