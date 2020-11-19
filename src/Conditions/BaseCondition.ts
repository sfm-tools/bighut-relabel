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
    let result: boolean = false;

    predicate = predicate || this.predicate;

    if (typeof predicate === 'string') {
      result = this.stringComparer(predicate, value);
    } else if (typeof predicate === 'function') {
      result = predicate(value, context);
    } else if (predicate instanceof RegExp) {
      // When a regex has the global flag set, test() will advance the lastIndex of the regex.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#Using_test()_on_a_regex_with_the_global_flag
      predicate.lastIndex = 0;
      result = predicate.test(value);
    } else if (Array.isArray(predicate)) {
      result = predicate.includes(value);
    }

    context.logger.debug(
      '{class}.{method}: pr#{pullRequest.code}: the value "{value}" testing with predicate {type} yields the result "{result}"',
      {
        class: this.constructor.name,
        method: this.test.name,
        value,
        type: typeof predicate,
        ...(
          predicate instanceof RegExp
            ? {
              regExp: predicate
            }
            : {}
        ),
        result,
        pullRequest: context.pullRequest,
      }
    );

    return result;
  }

  /**
   * Returns the specified result depending on the value of the nothing option.
   */
  protected testResult(value: boolean, context: LabelerContext): boolean {
    const { nothing } = this.getOptions();
    const result = (
      value && !nothing
    )
    || (
      !value && !!nothing
    );

    context.logger.debug(
      '{class}.{method}: pr#{pullRequest.code}: the value "{value}" when option nothing is "{nothing}" then result is "{result}""',
      {
        class: this.constructor.name,
        method: this.test.name,
        nothing,
        value,
        result,
        pullRequest: context.pullRequest,
      }
    );

    return result;
  }
  }

  protected getOptions(): ConditionOptionsValues<TConditionOptions> {
    return (this.options?.['values'] || {}) as ConditionOptionsValues<TConditionOptions>;
  }

}
