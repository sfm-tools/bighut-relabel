import { Branch } from '../../../src/ApiProviders';
import { CacheableAction } from '../../../src/CacheableAction';

export const issue2Branch: Branch = {
  name: 'issue-2',
  isExists: new CacheableAction(() => Promise.resolve(true)),
};
