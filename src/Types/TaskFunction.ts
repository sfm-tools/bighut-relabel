import { LabelerContext } from '../LabelerContext';

export type TaskFunction = (context: LabelerContext) => Promise<void>;
