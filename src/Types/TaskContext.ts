import { IApiProviderClient } from '../ApiProviders';
import { LabelerContext } from '../LabelerContext';

export type TaskContext = {

  labelerContext: LabelerContext;

  githubClient: IApiProviderClient;

};
