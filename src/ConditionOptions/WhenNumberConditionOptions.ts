import { BaseConditionOptions } from './BaseConditionOptions';
import { NumberConditionOptionsValues } from './Values';

export class WhenNumberConditionOptions extends BaseConditionOptions<NumberConditionOptionsValues> {

  public equal(value: number): WhenNumberConditionOptions {
    this.values.equal = value;

    return this;
  }

  public greaterThan(value: number): WhenNumberConditionOptions {
    this.values.greaterThan = value;

    return this;
  }

  public greaterThanOrEqualTo(value: number): WhenNumberConditionOptions {
    this.values.greaterThanOrEqualTo = value;

    return this;
  }

  public lessThan(value: number): WhenNumberConditionOptions {
    this.values.lessThan = value;

    return this;
  }

  public lessThanOrEqualTo(value: number): WhenNumberConditionOptions {
    this.values.lessThanOrEqualTo = value;

    return this;
  }

  public between(from: number, to: number): WhenNumberConditionOptions {
    this.values.between = {
      from,
      to,
    };

    return this;
  }

}
