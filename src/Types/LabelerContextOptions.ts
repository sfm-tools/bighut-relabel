import { IApiProviderClient, PullRequest } from '../ApiProviders';
import { ICache } from '../Interfaces';

export type LabelerContextOptions = {

  pullRequest: PullRequest;

  apiProviderClient?: IApiProviderClient;

  cache?: ICache;

  test?: boolean;

}
