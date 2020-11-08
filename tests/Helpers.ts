import { CacheableAction } from '../src/CacheableAction';

export function emptyCacheableAction<T>(): CacheableAction<T> {
  return new CacheableAction(() => Promise.resolve<T>(undefined));
}

export function emptyListOfCacheableAction<T>(): CacheableAction<Array<T>> {
  return new CacheableAction(() => Promise.resolve<Array<T>>([]));
}
