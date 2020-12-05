import { StringTestValue } from '../../Types';
import { ConditionOptionsValues } from './ConditionOptionsValues';

export type WhenFileContentConditionOptionsValues = ConditionOptionsValues & {

  onlyNewFiles?: boolean;

  onlyModifiedFiles?: boolean;

  excludePaths?: StringTestValue;

  includeOnlyPaths?: StringTestValue;

};
