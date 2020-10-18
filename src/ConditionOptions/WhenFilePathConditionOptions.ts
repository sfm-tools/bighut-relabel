import { DefaultPredicateType } from '../Types';
import { BaseConditionOptions } from './BaseConditionOptions';
import { WhenFilePathConditionOptionsValues } from './Values';

export class WhenFilePathConditionOptions extends BaseConditionOptions<WhenFilePathConditionOptionsValues> {

  public excludeFilePath(predicate: DefaultPredicateType): WhenFilePathConditionOptions {
    this.values.excludeFilePath = this.values.excludeFilePath || [];
    this.values.excludeFilePath.push(predicate);

    return this;
  }

  public excludeRemovedFiles(): WhenFilePathConditionOptions {
    this.values.excludeRemovedFiles = true;

    return this;
  }

  public excludeModifiedFiles(): WhenFilePathConditionOptions {
    this.values.excludeModifiedFiles = true;

    return this;
  }

  public excludeNewFiles(): WhenFilePathConditionOptions {
    this.values.excludeNewFiles = true;

    return this;
  }

}
