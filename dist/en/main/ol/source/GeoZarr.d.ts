/**
 * @typedef {'nearest'|'linear'} ResampleMethod
 */
/**
 * @typedef {Object} Options
 * @property {string} url The Zarr URL including the multiscales group path (e.g. `'https://example.com/store.zarr/measurements/reflectance'`).
 * @property {Array<string>} bands The band names to render.
 * @property {import("../proj.js").ProjectionLike} [projection] Source projection.  If not provided, the GeoZarr metadata
 * will be read for projection information.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {boolean} [wrapX=false] Render tiles beyond the tile grid extent.
 * @property {ResampleMethod} [resample='nearest'] Resamplilng method if bands are not available for all multi-scale levels.
 */
/**
 * Source that supports GeoZarr stores with metadata for the following conventions:
 * - Zarr multiscales convention (https://github.com/zarr-conventions/multiscales)
 * - Geospatial projection convention (https://github.com/zarr-conventions/geo-proj)
 * - Spatial convention (https://github.com/zarr-conventions/spatial)
 */
export default class GeoZarr extends DataTileSource<import("../DataTile.js").default> {
    /**
     * @param {Options} options The options.
     */
    constructor(options: Options);
    /**
     * @type {string}
     * @private
     */
    private url_;
    /**
     * @type {Error|null}
     */
    error_: Error | null;
    /**
     * @type {import('zarrita').Group<any>}
     * @private
     */
    private group_;
    /**
     * @type {any|null}
     * @private
     */
    private consolidatedMetadata_;
    /**
     * Cache of opened zarrita arrays keyed by path. Caching the Promise
     * (not the resolved value) deduplicates concurrent opens for the same
     * array path across tiles at the same zoom level.
     * @type {Map<string, Promise<import('zarrita').Array<import('zarrita').DataType, any>>>}
     * @private
     */
    private arrayCache_;
    /**
     * @type {Array<string>}
     * @private
     */
    private bands_;
    /**
     * @type {Object<string, Array<string>> | null}
     * @private
     */
    private bandsByLevel_;
    /**
     * @type {number|undefined}
     * @private
     */
    private fillValue_;
    /**
     * @type {ResampleMethod}
     * @private
     */
    private resampleMethod_;
    /**
     * @type {import("../tilegrid/WMTS.js").default}
     * @override
     */
    override tileGrid: import("../tilegrid/WMTS.js").default;
    configure_(): Promise<void>;
    /**
     * @param {number} z The z tile index.
     * @param {number} x The x tile index.
     * @param {number} y The y tile index.
     * @param {import('./DataTile.js').LoaderOptions} options The loader options.
     * @return {Promise} The composed tile data.
     * @private
     */
    private loadTile_;
}
export type ShardInfo = {
    /**
     * The shard (outer chunk) shape [rows, cols].
     */
    shardShape: Array<number>;
    /**
     * The inner chunk shape [rows, cols].
     */
    innerChunkShape: Array<number>;
};
export type ResampleMethod = "nearest" | "linear";
export type Options = {
    /**
     * The Zarr URL including the multiscales group path (e.g. `'https://example.com/store.zarr/measurements/reflectance'`).
     */
    url: string;
    /**
     * The band names to render.
     */
    bands: Array<string>;
    /**
     * Source projection.  If not provided, the GeoZarr metadata
     * will be read for projection information.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number | undefined;
    /**
     * Render tiles beyond the tile grid extent.
     */
    wrapX?: boolean | undefined;
    /**
     * Resamplilng method if bands are not available for all multi-scale levels.
     */
    resample?: ResampleMethod | undefined;
};
export type DatasetAttributes = {
    /**
     * The multiscales attribute.
     */
    multiscales: Multiscales;
    /**
     * The zarr conventions attribute.
     */
    zarr_conventions: Array<{
        uuid: string;
    }>;
};
export type Multiscales = {
    /**
     * The layout.
     */
    layout: any;
};
export type LegacyDatasetAttributes = {
    /**
     * The multiscales attribute.
     */
    multiscales: LegacyMultiscales;
};
export type LegacyMultiscales = {
    /**
     * The tile matrix limits.
     */
    tile_matrix_limits: any;
    /**
     * The tile matrix set.
     */
    tile_matrix_set: any;
};
export type TileGridInfo = {
    /**
     * The tile grid.
     */
    tileGrid: WMTSTileGrid;
    /**
     * The projection.
     */
    projection: import("../proj/Projection.js").default;
    /**
     * Available bands by level.
     */
    bandsByLevel?: {
        [x: string]: string[];
    } | undefined;
    /**
     * The fill value.
     */
    fillValue?: number | undefined;
    /**
     * The tile sizes for each level, if available.
     */
    tileSizes?: Array<import("../size.js").Size> | undefined;
};
import DataTileSource from './DataTile.js';
import WMTSTileGrid from '../tilegrid/WMTS.js';
//# sourceMappingURL=GeoZarr.d.ts.map