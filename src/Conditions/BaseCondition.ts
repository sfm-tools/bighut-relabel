import { BaseConditionOptions, DefaultConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import {
  DefaultPredicateType,
  StringComparer,
  stringComparison,
} from '../Types';

type ConditionOptionsValues<T> = T extends BaseConditionOptions<infer TValue> ? TValue : never;

export abstract class BaseCondition<
  TPredicate = DefaultPredicateType,
  TConditionOptions extends BaseConditionOptions = DefaultConditionOptions
> {

  protected static readonly equalStrings = stringComparison.equal;

  protected static readonly containsString = stringComparison.contains;

  protected readonly predicate: TPredicate;

  protected readonly options: TConditionOptions;

  protected get stringComparer(): StringComparer {
    return stringComparison.equal;
  }

  constructor(predicate: TPredicate, options?: TConditionOptions) {
    this.predicate = predicate;
    this.options = options;
  }

  public abstract test(context: LabelerContext): Promise<boolean> | boolean;

  protected testStringValue(value: string, context: LabelerContext, predicate?: TPredicate): boolean {
    predicate = predicate || this.predicate;

    if (typeof predicate === 'string') {
      return this.stringComparer(predicate, value);
    }

    if (typeof predicate === 'function') {
      return predicate(value, context);
    }

    if (predicate instanceof RegExp) {
      return predicate.test(value);
    }

    if (Array.isArray(predicate)) {
      return predicate.includes(value);
    }

    throw new Error('The predicate type is not supported. Expectected a string, Array<string>, RegExp or Function.');
  }

  protected testForExcludedSting(value: string, context: LabelerContext, exclude: Array<DefaultPredicateType>): boolean {
    if (exclude?.length) {
      for (const predicate of exclude) {
        // TODO: Houston we have problems with predicate type
        if (this.testStringValue(value, context, predicate as unknown as TPredicate)) {
          this.getOptions().noOne && console.warn('noOne not works with the exclude option.');
          return true;
        }
      }
    }

    return false;
  }

  protected getOptions(): ConditionOptionsValues<TConditionOptions> {
    return (this.options?.['values'] || {}) as ConditionOptionsValues<TConditionOptions>;
  }

}
