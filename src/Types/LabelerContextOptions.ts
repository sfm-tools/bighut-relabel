import { IApiProviderClient, PullRequest } from '../ApiProviders';
import { ICache, ILogger } from '../Interfaces';

export type LabelerContextOptions = {

  pullRequest: PullRequest;

  apiProviderClient?: IApiProviderClient;

  cache?: ICache;

  test?: boolean;

  logger?: ILogger;

}
