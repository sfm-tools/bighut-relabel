import { BaseConditionOptions } from './BaseConditionOptions';
import { WhenFileContentConditionOptionsValues } from './Values';

export class WhenFileContentConditionOptions extends BaseConditionOptions<WhenFileContentConditionOptionsValues> {

  public onlyNewFiles(): WhenFileContentConditionOptions {
    this.values.onlyNewFiles = true;
    this.values.onlyModifiedFiles = false;

    return this;
  }

  public onlyModifiedFiles(): WhenFileContentConditionOptions {
    this.values.onlyModifiedFiles = true;
    this.values.onlyNewFiles = false;

    return this;
  }

}
