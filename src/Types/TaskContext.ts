import { IApiProviderClient } from '../GitHubClient';
import { LabelerContext } from '../LabelerContext';

export type TaskContext = {

  labelerContext: LabelerContext;

  githubClient: IApiProviderClient;

};
