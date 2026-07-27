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
 * @property {Object<string, number|string>} [dimensions] Fixed index for each non-spatial
 * dimension of the band arrays, keyed by dimension name (e.g. `{time: 0}` for the first time step
 * of a `[time, y, x]` cube); unspecified dimensions default to `0`. Names come from each array's
 * `dimension_names`, or are the axis position as a string when it has none. Only integer indices
 * are supported. Use the names from {@link getDimensions}, and change the selection on the fly with
 * {@link module:ol/source/GeoZarr~GeoZarr#updateDimensions}.
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
     * Fixed index per non-spatial dimension name, from the `dimensions` option.
     * @type {Object<string, number|string>}
     * @private
     */
    private dimensions_;
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
     * Per-band selection along non-spatial dimensions: `undefined` for 2-D
     * arrays, otherwise an array aligned to the array rank with a fixed integer
     * at each extra axis and `null` at the two spatial axes (e.g. `[2, null,
     * null]` for a `[time, y, x]` array with `time: 2`).
     * @type {Array<Array<number|null>|undefined>}
     * @private
     */
    private bandExtraSelection_;
    /**
     * Per-band spatial (y, x) axis positions, as `{row, col}`.
     * @type {Array<{row: number, col: number}>}
     * @private
     */
    private bandSpatialAxes_;
    /**
     * The two spatial axis names from the group's `spatial:dimensions` (`[y, x]`).
     * @type {Array<string>|undefined}
     * @private
     */
    private spatialDimensionNames_;
    /**
     * Non-spatial dimensions of the bands, exposed via {@link getDimensions}.
     * @type {Array<{name: string, size: number}>}
     * @private
     */
    private extraDimensions_;
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
    /**
     * Open a Zarr array (path relative to its group) through the shared cache, so
     * concurrent opens of the same array are deduplicated.
     * @param {number} groupIndex The band's group index.
     * @param {string} path The array path relative to the group.
     * @return {Promise<import('zarrita').Array<import('zarrita').DataType, any>>} The array.
     * @private
     */
    private openArray_;
    /**
     * Consolidated metadata for a group, with keys relative to that group.
     * @param {number} groupIndex The group index.
     * @return {Object} The group's consolidated metadata.
     * @private
     */
    private groupMetadata_;
    /**
     * Look up a band's Zarr v3 array metadata from consolidated metadata, trying
     * the multi-scale key (`<matrixId>/<band>`) first and falling back to a
     * single-scale key (`<band>`).
     * @param {string} band The band name.
     * @param {number} groupIndex The index of the band's group.
     * @return {Object|undefined} The array metadata, or undefined when unavailable.
     * @private
     */
    private getBandArrayMeta_;
    /**
     * Locate the 1-D coordinate array for a non-spatial dimension, by name among
     * the group's 1-D arrays.
     * @param {string} name The dimension name.
     * @return {{path: string, groupIndex: number, meta: Object}|null} The path
     *     (relative to the group), group index, and array metadata; or `null`.
     * @private
     */
    private coordinateArray_;
    /**
     * Get the non-spatial dimensions of the bands (e.g. `time`) that can be fixed
     * through the `dimensions` option, keyed by dimension name. Each entry has its
     * `size` and the `attributes` of its coordinate array (e.g. `units`, for
     * interpreting the values from {@link getValue}), or `attributes: null` when
     * there is no coordinate array. Resolves with an empty object for 2-D bands,
     * once the source is `ready`; rejects if the source fails to load.
     * @return {Promise<Object<string, {size: number, attributes: Object|null}>>}
     *     The selectable dimensions.
     */
    getDimensions(): Promise<{
        [x: string]: {
            size: number;
            attributes: any | null;
        };
    }>;
    /**
     * Read the coordinate value at an index along a non-spatial dimension (e.g.
     * the timestamp for a `time` index), for labeling the current selection. The
     * value is returned raw (as stored, e.g. a `bigint` for a 64-bit integer
     * axis); use the `attributes` from {@link getDimensions} to interpret it.
     * Returns `null` for a dimension without a coordinate array. Available once
     * the source is `ready`.
     * @param {string} name The dimension name (see {@link getDimensions}).
     * @param {number} index The index along the dimension.
     * @return {Promise<number|bigint|null>} The coordinate value, or null.
     */
    getValue(name: string, index: number): Promise<number | bigint | null>;
    /**
     * Change the fixed index of one or more non-spatial dimensions (e.g. move to
     * another `time` slice) without rebuilding the source. Values are merged into
     * the current selection, so a partial update like `{time: 3}` leaves the other
     * dimensions untouched. Takes effect immediately when the source is `ready`,
     * otherwise once it becomes ready.
     * @param {Object<string, number|string>} dimensions Index per dimension name
     *     to change; see the `dimensions` constructor option.
     */
    updateDimensions(dimensions: {
        [x: string]: string | number;
    }): void;
    /**
     * Locate the spatial (y, x) axes of an array (see {@link getSpatialAxes}) and
     * its remaining non-spatial axes.
     * @param {Object|undefined} arrayMeta Zarr v3 array metadata.
     * @return {{row: number, col: number, extra: Array<number>}} The row (y) and
     *     column (x) axis positions and the remaining extra axes, in array order.
     * @private
     */
    private axesOf_;
    /**
     * Describe the non-spatial dimensions of an array. Each is named by its
     * `dimension_names` entry, or by its axis position when there are none.
     * @param {Object|undefined} arrayMeta Zarr v3 array metadata.
     * @return {Array<{name: string, size: number, axis: number}>} The extra dimensions, outermost first.
     * @private
     */
    private extraDimsOf_;
    /**
     * Resolve the fixed index for each non-spatial dimension of a band array from
     * the `dimensions` option. Returns `undefined` for 2-D arrays, otherwise an
     * array aligned to the array rank with a fixed integer at each extra axis and
     * `null` at the two spatial axes (e.g. `[2, null, null]` for a `[time, y, x]`
     * array with `{time: 2}`).
     * @param {Object|undefined} arrayMeta Zarr v3 array metadata.
     * @return {Array<number|null>|undefined} The extra-axis selection template.
     * @private
     */
    private resolveExtraSelection_;
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
    /**
     * Fixed index for each non-spatial
     * dimension of the band arrays, keyed by dimension name (e.g. `{time: 0}` for the first time step
     * of a `[time, y, x]` cube); unspecified dimensions default to `0`. Names come from each array's
     * `dimension_names`, or are the axis position as a string when it has none. Only integer indices
     * are supported. Use the names from {@link getDimensions}, and change the selection on the fly with
     * {@link module :ol/source/GeoZarr~GeoZarr#updateDimensions}.
     */
    dimensions?: {
        [x: string]: string | number;
    } | undefined;
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
    "spatial:dimensions"?: Array<string>;
    "proj:wkt2"?: string;
    "proj:projjson"?: any;
    "proj:code"?: string | null;
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