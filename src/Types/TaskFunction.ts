import { TaskContext } from './TaskContext';

export type TaskFunction = (context: TaskContext) => Promise<void>;
