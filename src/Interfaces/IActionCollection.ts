import { IActionExecutor } from '../ActionExecutors';
import { IAction } from './IAction';

export interface IActionCollection {

  readonly actions: Array<IActionExecutor<IAction>>;

}
