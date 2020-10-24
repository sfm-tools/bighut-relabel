import { BaseConditionOptions } from './BaseConditionOptions';
import { WhenCommentTextConditionOptionsValues } from './Values';

export class WhenCommentTextConditionOptions extends BaseConditionOptions<WhenCommentTextConditionOptionsValues> {

  public andAlsoAuthorLogin(login: string): WhenCommentTextConditionOptions {
    this.values.authorLogin = login;

    return this;
  }

  public andAlsoCreationDate(range: { from?: Date, to?: Date }): WhenCommentTextConditionOptions {
    this.values.creationDateRange = range;

    return this;
  }

}
