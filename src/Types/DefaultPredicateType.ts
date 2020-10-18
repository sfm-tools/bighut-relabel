import { LabelerContext } from '../LabelerContext';
import { StringTestValue } from './StringTestValue';

export type DefaultPredicateType = StringTestValue | { (value: string, context?: LabelerContext): boolean };
