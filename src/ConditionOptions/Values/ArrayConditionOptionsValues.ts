import { ConditionOptionsValues } from './ConditionOptionsValues';

export type ArrayConditionOptionsValues<TValue = string> = ConditionOptionsValues & {

  oneOf?: boolean;

  all?: boolean;

  value?: Array<TValue>;

};
