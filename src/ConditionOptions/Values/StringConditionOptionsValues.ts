import { DefaultPredicateType } from '../../Types';
import { ConditionOptionsValues } from './ConditionOptionsValues';

export type StringConditionOptionsValues = ConditionOptionsValues & {

  exclude?: Array<DefaultPredicateType>;

};
