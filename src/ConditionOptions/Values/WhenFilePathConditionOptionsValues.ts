import { DefaultPredicateType } from '../../Types';
import { ConditionOptionsValues } from './ConditionOptionsValues';

export type WhenFilePathConditionOptionsValues = ConditionOptionsValues & {

  excludeFilePath?: Array<DefaultPredicateType>;

  excludeRemovedFiles?: boolean;

  excludeModifiedFiles?: boolean;

  excludeNewFiles?: boolean;

};
