import { CacheableAction } from '../../src/CacheableAction';

export function emptyListOfCacheableAction<T>(): CacheableAction<Array<T>> {
  return new CacheableAction(() => Promise.resolve<Array<T>>([]));
}
