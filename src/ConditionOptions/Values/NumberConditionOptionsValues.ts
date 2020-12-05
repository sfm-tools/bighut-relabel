import { ConditionOptionsValues } from './ConditionOptionsValues';

export type NumberConditionOptionsValues = ConditionOptionsValues & {

  equal?: number;

  lessThan?: number;

  lessThanOrEqualTo?: number;

  greaterThan?: number;

  greaterThanOrEqualTo?: number;

  between?: {
    from: number;
    to: number;
  }

};
