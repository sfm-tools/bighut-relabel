import { PullRequest } from '../ApiProviders';
import { ICache } from '../Interfaces';

export type LabelerContextOptions = {

  pullRequest: PullRequest;

  cache?: ICache;

  test?: boolean;

}
