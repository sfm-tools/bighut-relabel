import { BaseConditionOptions } from './BaseConditionOptions';
import { ArrayConditionOptionsValues } from './Values';

export class WhenContainsRequestsToReviewConditionOptions extends BaseConditionOptions<ArrayConditionOptionsValues<string>> {

  public oneOf(logins: Array<string>): WhenContainsRequestsToReviewConditionOptions {
    this.values.oneOf = true;
    this.values.all = false;
    this.values.value = logins;

    return this;
  }

  public all(logins: Array<string>): WhenContainsRequestsToReviewConditionOptions {
    this.values.oneOf = false;
    this.values.all = true;
    this.values.value = logins;

    return this;
  }

}
