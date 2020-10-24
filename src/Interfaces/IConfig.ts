import { LabelerContext } from '../LabelerContext';
import { TaskFunction } from '../Types';
import { IAction } from './IAction';

export interface IConfig {

  addComment(text: string): IAction;

  addLabel(label: string): IAction;

  removeLabel(label: string): IAction;

  setTitle(title: string | { (title: string, context?: LabelerContext): string }): IAction;

  setDescription(description: string | { (description: string, context?: LabelerContext): string }): IAction;

  setMilestone(milestoneName: string | { (milestoneName: string, context?: LabelerContext): string }): IAction;

  execute(action: TaskFunction): IAction;

}
