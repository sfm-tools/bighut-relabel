import { Branch } from '../../../src/ApiProviders';
import { CacheableAction } from '../../../src/CacheableAction';

export const issue1Branch: Branch = {
  name: 'issue-1',
  isExists: new CacheableAction(() => Promise.resolve(true)),
};
