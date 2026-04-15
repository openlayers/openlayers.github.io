/**
 * @typedef {'nearest'|'linear'} ResampleMethod
 */
/**
 * @typedef {Object} Band
 * @property {string} name The band name.
 * @property {string} group The group path relative to the `url`, containing this band
 * (e.g. `'measurements/reflectance'`).
 */
/**
 * @typedef {Object} Options
 * @property {string} url When `bands` contains plain strings, this must be the full URL to the
 * multiscales group (e.g. `'https://example.com/store.zarr/measurements/reflectance'`).
 * When `bands` contains {@link Band} objects, this is the base URL from which each band's
 * `group` path is resolved (e.g. `'https://example.com/store.zarr/satellite/sentinel2'`).
 * @property {Array<string|Band>} bands The bands to render.  Each entry is either a band name
 * string (single-group mode) or a {@link Band} object specifying both the band name and the
 * group it belongs to (multi-group mode).  In multi-group mode, the first band's group
 * determines the tile grid and must follow at least the proj: and spatial: conventions.
 * If it also has a multiscales layout (all three conventions), multiple resolution levels are
 * supported.  Otherwise a single-resolution tile grid is derived from `spatial:bbox`,
 * `proj:code`, and `spatial:shape` (or the array shape from consolidated metadata).
 * Bands from additional groups do not need to follow any convention; they can be multi-scale
 * (array located at `<matrixId>/<bandName>`) or single-scale (array at the group root).
 * @property {import("../proj.js").ProjectionLike} [projection] Source projection.  If not provided, the GeoZarr metadata
 * will be read for projection information.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {boolean} [wrapX=false] Render tiles beyond the tile grid extent.
 * @property {ResampleMethod} [resample='nearest'] Resampling method if bands are not available for all multi-scale levels.
 */
/**
 * Source for GeoZarr stores conforming to the following conventions:
 * - [Zarr multiscales convention](https://github.com/zarr-conventions/multiscales)
 * - [Geospatial projection convention](https://github.com/zarr-conventions/geo-proj)
 * - [Spatial convention](https://github.com/zarr-conventions/spatial)
 *
 * When all three conventions are present, multiple resolution levels are supported.
 * When only proj: and spatial: are present, a single-resolution tile grid is derived
 * from `spatial:bbox`, `proj:code`, and `spatial:shape`.
 * The legacy `tile_matrix_set` attribute is also supported.
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
     * @type {Array<import('zarrita').Group<any>>}
     * @private
     */
    private groups_;
    /**
     * @type {any|null}
     * @private
     */
    private consolidatedMetadata_;
    /**
     * Cache of opened zarrita arrays keyed by path. Caching the Promise
     * (not the resolved value) deduplicates concurrent opens for the same
     * array path across tiles at the same zoom level.
     * @private
     * @type {Map<string, Promise<import('zarrita').Array<import('zarrita').DataType, any>>>}
     */
    private arrayCache_;
    /**
     * @type {Array<string>|undefined}
     * @private
     */
    private groupPaths_;
    /**
     * Maps each band index to the index of the group it belongs to in `this.groups_`.
     * @type {Array<number>}
     * @private
     */
    private bandGroupIndex_;
    /**
     * Pixel resolution for single-scale bands.  When set, indicates that the
     * band lives directly at its group root (no matrixId subdirectory) and
     * provides the pixel resolution to use for coordinate calculations.
     * Undefined for multi-scale bands.
     * @type {Array<number|undefined>}
     * @private
     */
    private bandSingleScaleResolution_;
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
    /**
     * For multi-group mode: determine which group owns each band and supplement
     * bandsByLevel with bands from additional groups.
     * @private
     */
    private resolveBandOwnership_;
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
export type Band = {
    /**
     * The band name.
     */
    name: string;
    /**
     * The group path relative to the `url`, containing this band
     * (e.g. `'measurements/reflectance'`).
     */
    group: string;
};
export type Options = {
    /**
     * When `bands` contains plain strings, this must be the full URL to the
     * multiscales group (e.g. `'https://example.com/store.zarr/measurements/reflectance'`).
     * When `bands` contains {@link Band} objects, this is the base URL from which each band's
     * `group` path is resolved (e.g. `'https://example.com/store.zarr/satellite/sentinel2'`).
     */
    url: string;
    /**
     * The bands to render.  Each entry is either a band name
     * string (single-group mode) or a {@link Band} object specifying both the band name and the
     * group it belongs to (multi-group mode).  In multi-group mode, the first band's group
     * determines the tile grid and must follow at least the proj: and spatial: conventions.
     * If it also has a multiscales layout (all three conventions), multiple resolution levels are
     * supported.  Otherwise a single-resolution tile grid is derived from `spatial:bbox`,
     * `proj:code`, and `spatial:shape` (or the array shape from consolidated metadata).
     * Bands from additional groups do not need to follow any convention; they can be multi-scale
     * (array located at `<matrixId>/<bandName>`) or single-scale (array at the group root).
     */
    bands: Array<string | Band>;
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
     * Resampling method if bands are not available for all multi-scale levels.
     */
    resample?: ResampleMethod | undefined;
};
/**
 * *
 */
export type DatasetAttributes = {
    multiscales: Multiscales;
    zarr_conventions: Array<{
        uuid: string;
    }>;
    "spatial:bbox": import("../extent.js").Extent;
    "spatial:shape": Array<number>;
    "proj:code": string;
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