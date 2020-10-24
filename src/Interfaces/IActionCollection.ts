import { IAction } from './IAction';
import { IActionExecutor } from './IActionExecutor';

export interface IActionCollection {

  readonly actions: Array<IActionExecutor<IAction>>;

}
