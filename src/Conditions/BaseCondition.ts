import { LabelerContext } from '../LabelerContext';
import { DefaultPredicateType } from '../Types';

export abstract class BaseCondition<TPredicate = DefaultPredicateType> {

  protected readonly predicate: TPredicate;

  constructor(predicate: TPredicate) {
    this.predicate = predicate;
  }

  public abstract test(context: LabelerContext): Promise<boolean> | boolean;

  protected testStringValue(value: string, context: LabelerContext, predicate?: TPredicate): boolean {
    predicate = predicate || this.predicate;

    if (typeof predicate === 'string') {
      return predicate === value;
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

}
