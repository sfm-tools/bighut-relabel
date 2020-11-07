import { Branch } from '../../../src/ApiProviders';
import { CacheableAction } from '../../../src/CacheableAction';

export const mainBranch: Branch = {
  name: 'main',
  isExists: new CacheableAction(() => Promise.resolve(true)),
};
