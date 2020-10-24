import { DefaultPredicateType } from '../../Types';
import { ConditionOptionsValues } from './ConditionOptionsValues';

/**
 * @deprecated It looks like these conditions are redundant.
 */
export type StringConditionOptionsValues = ConditionOptionsValues & {

  exclude?: Array<DefaultPredicateType>;

};
