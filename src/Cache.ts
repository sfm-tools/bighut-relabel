import NodeCache from 'node-cache';

import { ICache } from './Interfaces';

export class Cache implements ICache {

  private readonly _cache = new NodeCache();

  public has(key: string): boolean {
    return this._cache.has(key);
  }

  public keys(): Array<string> {
    return this._cache.keys();
  }

  public get<T>(key: string): T | undefined {
    return this._cache.get(key);
  }

  public add<T>(key: string, value: T, ttl: number): boolean {
    return this._cache.set(key, value, ttl);
  }

  public remove(keys: string | Array<string>): number {
    return this._cache.del(keys);
  }

  public clearAll(): void {
    this._cache.flushAll();
  }

}
