import { DefaultPredicateType } from '../Types';
import { BaseConditionOptions } from './BaseConditionOptions';
import { StringConditionOptionsValues } from './Values';

export class StringConditionOptions extends BaseConditionOptions<StringConditionOptionsValues> {

  public exclude(predicate: DefaultPredicateType): StringConditionOptions {
    this.values.exclude = this.values.exclude || [];
    this.values.exclude.push(predicate);

    return this;
  }

}
