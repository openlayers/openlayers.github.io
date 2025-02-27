export default LRUCache;
export type Entry = {
    /**
     * Key.
     */
    key_: string;
    /**
     * Newer.
     */
    newer: Entry | null;
    /**
     * Older.
     */
    older: Entry | null;
    /**
     * Value.
     */
    value_: any;
};
/**
 * @typedef {Object} Entry
 * @property {string} key_ Key.
 * @property {Entry|null} newer Newer.
 * @property {Entry|null} older Older.
 * @property {*} value_ Value.
 */
/**
 * @classdesc
 * Implements a Least-Recently-Used cache where the keys do not conflict with
 * Object's properties (e.g. 'hasOwnProperty' is not allowed as a key). Expiring
 * items from the cache is the responsibility of the user.
 *
 * @fires import("../events/Event.js").default
 * @template T
 */
declare class LRUCache<T> {
    /**
     * @param {number} [highWaterMark] High water mark.
     */
    constructor(highWaterMark?: number);
    /**
     * Desired max cache size after expireCache(). If set to 0, no cache entries
     * will be pruned at all.
     * @type {number}
     */
    highWaterMark: number;
    /**
     * @private
     * @type {number}
     */
    private count_;
    /**
     * @private
     * @type {!Object<string, Entry>}
     */
    private entries_;
    /**
     * @private
     * @type {?Entry}
     */
    private oldest_;
    /**
     * @private
     * @type {?Entry}
     */
    private newest_;
    deleteOldest(): void;
    /**
     * @return {boolean} Can expire cache.
     */
    canExpireCache(): boolean;
    /**
     * Expire the cache. When the cache entry is a {@link module:ol/Disposable~Disposable},
     * the entry will be disposed.
     * @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
     */
    expireCache(keep?: {
        [x: string]: boolean;
    }): void;
    /**
     * FIXME empty description for jsdoc
     */
    clear(): void;
    /**
     * @param {string} key Key.
     * @return {boolean} Contains key.
     */
    containsKey(key: string): boolean;
    /**
     * @param {function(T, string, LRUCache<T>): ?} f The function
     *     to call for every entry from the oldest to the newer. This function takes
     *     3 arguments (the entry value, the entry key and the LRUCache object).
     *     The return value is ignored.
     */
    forEach(f: (arg0: T, arg1: string, arg2: LRUCache<T>) => unknown): void;
    /**
     * @param {string} key Key.
     * @param {*} [options] Options (reserved for subclasses).
     * @return {T} Value.
     */
    get(key: string, options?: any): T;
    /**
     * Remove an entry from the cache.
     * @param {string} key The entry key.
     * @return {T} The removed entry.
     */
    remove(key: string): T;
    /**
     * @return {number} Count.
     */
    getCount(): number;
    /**
     * @return {Array<string>} Keys.
     */
    getKeys(): Array<string>;
    /**
     * @return {Array<T>} Values.
     */
    getValues(): Array<T>;
    /**
     * @return {T} Last value.
     */
    peekLast(): T;
    /**
     * @return {string} Last key.
     */
    peekLastKey(): string;
    /**
     * Get the key of the newest item in the cache.  Throws if the cache is empty.
     * @return {string} The newest key.
     */
    peekFirstKey(): string;
    /**
     * Return an entry without updating least recently used time.
     * @param {string} key Key.
     * @return {T|undefined} Value.
     */
    peek(key: string): T | undefined;
    /**
     * @return {T} value Value.
     */
    pop(): T;
    /**
     * @param {string} key Key.
     * @param {T} value Value.
     */
    replace(key: string, value: T): void;
    /**
     * @param {string} key Key.
     * @param {T} value Value.
     */
    set(key: string, value: T): void;
    /**
     * Set a maximum number of entries for the cache.
     * @param {number} size Cache size.
     * @api
     */
    setSize(size: number): void;
}
//# sourceMappingURL=LRUCache.d.ts.map