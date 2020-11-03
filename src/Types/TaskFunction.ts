import { LabelerContext } from '../LabelerContext';
import { TaskContext } from './TaskContext';

export type TaskFunction = (context: LabelerContext | TaskContext) => Promise<void>;
