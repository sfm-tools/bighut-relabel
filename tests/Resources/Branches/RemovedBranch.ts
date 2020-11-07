import { Branch } from '../../../src/ApiProviders';
import { CacheableAction } from '../../../src/CacheableAction';

export const removedBranch: Branch = {
  name: 'removed',
  isExists: new CacheableAction(() => Promise.resolve(false)),
};
