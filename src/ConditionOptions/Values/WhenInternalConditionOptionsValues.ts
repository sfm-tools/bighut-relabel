import { ConditionOptionsValues } from './ConditionOptionsValues';

export type WhenInternalConditionOptionsValues = ConditionOptionsValues & {

  ignoreOtherActions?: boolean;

  comments?: string;

};
