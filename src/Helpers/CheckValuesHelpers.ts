import { NumberConditionOptionsValues } from '../ConditionOptions';

export function testNumberConditions(count: number, options: NumberConditionOptionsValues): boolean {
  const {
    equal,
    greaterThan,
    greaterThanOrEqualTo,
    lessThan,
    lessThanOrEqualTo,
    between,
  } = options;

  let result = [
    equal,
    greaterThan,
    greaterThanOrEqualTo,
    lessThan,
    lessThanOrEqualTo,
    between,
  ].some(hasValue);

  if (result && hasValue(equal)) {
    result = count === equal;
  }

  if (result && hasValue(greaterThan)) {
    result = count > greaterThan;
  }

  if (result && hasValue(greaterThanOrEqualTo)) {
    result = count >= greaterThanOrEqualTo;
  }

  if (result && hasValue(lessThan)) {
    result = count < lessThan;
  }

  if (result && hasValue(lessThanOrEqualTo)) {
    result = count <= lessThanOrEqualTo;
  }

  if (result && hasValue(between)) {
    result = count >= between.from && count <= between.to;
  }

  return result;
}

function hasValue(value: unknown): boolean {
  return value !== undefined && value !== null;
}
