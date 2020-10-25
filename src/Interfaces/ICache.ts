export interface ICache {

  has(key: string): boolean;

  keys(): Array<string>;

  get<T>(key: string): T | undefined;

  /**
   * Adds value to cache. Returns true on success.
   *
   * @param key The cache key.
   * @param value The value to cache.
   * @param ttl Time to live (in seconds).
   */
  add<T>(key: string, value: T, ttl: number): boolean;

  remove(keys: string | Array<string>): number;

  clearAll(): void;

}
