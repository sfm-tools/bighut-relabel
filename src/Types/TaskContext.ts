import { IApiProviderClient } from '../ApiProviders';
import { LabelerContext } from '../LabelerContext';

/**
 * @deprecated Please use `LabelerContext` instead.
 */
export type TaskContext = {

  labelerContext: LabelerContext;

  githubClient: IApiProviderClient;

};
