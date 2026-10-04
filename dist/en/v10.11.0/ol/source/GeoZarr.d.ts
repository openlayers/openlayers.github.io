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
 * @typedef {Object} GeoZarrStoreOptions
 * @property {Object<string, string>} [headers] additional key-value pairs of headers to be passed with each request. Key is the header name, value the header value.
 * @property {string} [credentials] How credentials shall be handled. See
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch for reference and possible values
 */
/**
 * @typedef {Object} Options
 * @property {string} url When `bands` contains plain strings, this must be the full URL to the
 * multiscales group (e.g. `'https://example.com/store.zarr/measurements/reflectance'`).
 * When `bands` contains {@link Band} objects, this is the base URL from which each band's
 * `group` path is resolved (e.g. `'https://example.com/store.zarr/satellite/sentinel2'`).
 * @property {Array<string|Band>} [bands] The bands to render, for stores where each
 * band is a separate array. Mutually exclusive with `variable`.  Each entry is either a band name
 * string (single-group mode) or a {@link Band} object specifying both the band name and the
 * group it belongs to (multi-group mode).  In multi-group mode, the first band's group
 * determines the tile grid and must follow at least the proj: and spatial: conventions.
 * If it also has a multiscales layout (all three conventions), multiple resolution levels are
 * supported.  Otherwise a single-resolution tile grid is derived from `spatial:bbox`,
 * `proj:code`, and `spatial:shape` (or the array shape from consolidated metadata).
 * Bands from additional groups do not need to follow any convention; they can be multi-scale
 * (array located at `<matrixId>/<bandName>`) or single-scale (array at the group root).
 * @property {GeoZarrStoreOptions} [storeOptions] Additional options to be passed to
 * [zarrita](https://zarrita.dev/)'s `FetchStore` with each request to the Zarr store.
 * @property {import("../proj.js").ProjectionLike} [projection] Source projection.
 * If not provided, the GeoZarr metadata will be read for projection information.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {boolean} [wrapX=false] Render tiles beyond the tile grid extent.
 * @property {ResampleMethod} [resample='linear'] Resampling method if bands are not available for all multi-scale levels.
 * @property {Object<string, number|string|Array<number|string>>} [dimensions] How to slice
 * each non-spatial dimension of the band arrays, keyed by dimension name (e.g. `{time: 0}` for
 * the first time step of a `[time, y, x]` cube). Values are 0-based indices (number) or
 * coordinate labels (string); unlisted dimensions default to index 0. Names come from each
 * array's `dimension_names`, or are the axis position as a string when it has none; use the
 * names from {@link getDimensions}. Labels are resolved against the dimension's coordinate
 * array; if that array cannot be read, pass indices instead. With `variable`, at most one
 * dimension may map to an array of values, whose entries are rendered as separate bands in
 * the given order. Change the selection on the fly with
 * {@link module:ol/source/GeoZarr~GeoZarr#updateDimensions}.
 * @property {string} [variable] The name of an n-dimensional data array (variable) to
 * render, for stores where all bands are packed into a single array (e.g. a
 * `(time, band, y, x)` datacube). The array must exist within each multiscale level
 * group (or at the group root for single-scale stores). Mutually exclusive with `bands`,
 * and required to select several bands from one dimension through `dimensions`.
 * @property {import("../extent.js").Extent} [extent] Fallback extent of the data, in
 * coordinates of the source projection. Only used when the store neither declares its
 * extent (`spatial:bbox` or `bounds` attributes) nor has coordinate arrays to infer it.
 * @property {boolean} [flipY] Fallback orientation: set to `true` when the data is
 * stored south-up (ascending y). Only used when the orientation can neither be read
 * from the store metadata nor inferred from its coordinate arrays.
 */
/**
 * Source for GeoZarr stores conforming to the following conventions:
 * - [Zarr multiscales convention](https://github.com/zarr-conventions/multiscales)
 * - [Geospatial projection convention](https://github.com/zarr-conventions/geo-proj)
 * - [Spatial convention](https://github.com/zarr-conventions/spatial)
 *
 * The store is read as a stack of resolution levels, enumerated from the
 * `multiscales` attribute in either its `{layout: [{asset, ...}]}` or its
 * `[{datasets: [{path, ...}]}]` form; a store with neither has the group itself as
 * its only level. The legacy `tile_matrix_set` attribute is also supported, and
 * describes the levels itself.
 *
 * Extent, resolution, projection and y-axis orientation are read from the store
 * metadata (`spatial:bbox`, `spatial:shape`, `spatial:transform`, `proj:code`,
 * ...) where declared, and otherwise inferred from the coordinate arrays. The
 * conventions above are what make that metadata available, but none of them has
 * to be declared for a store that provides the attributes.
 *
 * Two data layouts are supported:
 * - One array per band (`bands` option), addressed by name at `<matrixId>/<bandName>`
 *   (multi-scale) or at the group root (single-scale).
 * - A single n-dimensional data array shared by all bands (`variable` + `dimensions`
 *   options), e.g. a `(time, band, y, x)` datacube.
 *
 * Both layouts support Zarr v2 and v3.
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
     * @type {GeoZarrStoreOptions|undefined}
     * @private
     */
    private storeOptions_;
    /**
     * Selection per non-spatial dimension name, from the `dimensions` option.
     * Coordinate labels are replaced by their index once resolved.
     * @type {Object<string, number|string|Array<number|string>>}
     * @private
     */
    private dimensions_;
    /**
     * @type {string|undefined}
     * @private
     */
    private variable_;
    /**
     * @type {import("../extent.js").Extent|undefined}
     * @private
     */
    private fallbackExtent_;
    /**
     * @type {boolean|undefined}
     * @private
     */
    private fallbackFlipY_;
    /**
     * The zarrita open function, pinned to the store's Zarr version by
     * `configure_`. Never the unpinned `open`, which probes v2 metadata first
     * and so requests keys that a v3 store does not have.
     * @type {Function}
     * @private
     */
    private openFn_;
    /**
     * Group path prefix per tile matrix id, for stores whose levels are not
     * addressed by the matrix id itself (empty string for the group root).
     * `null` when the matrix id is the prefix.
     * @type {Object<string, string>|null}
     * @private
     */
    private levelPaths_;
    /**
     * Row axis information per tile matrix id, for data with non-square
     * pixels or south-up (flipped) rows.
     * @type {Object<string, {rowResolution: number, shapeY: number|undefined, flip: boolean}>|null}
     * @private
     */
    private levelRowInfo_;
    /**
     * The axis selected as multiple bands through the `dimensions` option,
     * or -1.
     * @type {number}
     * @private
     */
    private multiAxis_;
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
     * @type {Object<string, *>|null}
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
     * @type {Object<string, Array<string>>|null|undefined}
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
     * @return {Promise<import("../DataTile.js").Data>} The composed tile data.
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
     * @return {Object<string, *>} The group's consolidated metadata.
     * @private
     */
    private groupMetadata_;
    /**
     * Look up a band's Zarr v3 array metadata from consolidated metadata, trying
     * the multi-scale key (`<matrixId>/<band>`) first and falling back to a
     * single-scale key (`<band>`).
     * @param {string} band The band name.
     * @param {number} groupIndex The index of the band's group.
     * @return {Object<string, *>|undefined} The array metadata, or undefined when unavailable.
     * @private
     */
    private getBandArrayMeta_;
    /**
     * Locate the 1-D coordinate array for a non-spatial dimension, by name among
     * the group's 1-D arrays.
     * @param {string} name The dimension name.
     * @return {{path: string, groupIndex: number, meta: Object<string, *>}|null} The path
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
     * otherwise once it becomes ready. Only integer indices are accepted here;
     * coordinate labels are resolved once, when the source configures.
     * @param {Object<string, number>} dimensions Index per dimension name
     *     to change; see the `dimensions` constructor option.
     */
    updateDimensions(dimensions: {
        [x: string]: number;
    }): void;
    /**
     * Locate the spatial (y, x) axes of an array (see {@link getSpatialAxes}) and
     * its remaining non-spatial axes.
     * @param {Object<string, *>|undefined} arrayMeta Zarr v3 array metadata.
     * @return {{row: number, col: number, extra: Array<number>}} The row (y) and
     *     column (x) axis positions and the remaining extra axes, in array order.
     * @private
     */
    private axesOf_;
    /**
     * Describe the non-spatial dimensions of an array. Each is named by its
     * `dimension_names` entry, or by its axis position when there are none.
     * @param {Object<string, *>|undefined} arrayMeta Zarr v3 array metadata.
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
     * @param {Object<string, *>|undefined} arrayMeta Zarr v3 array metadata.
     * @param {Object<string, number|string|Array<number|string>>} dimensions The
     *     dimension indices to resolve against.
     * @return {Array<number|null>|undefined} The extra-axis selection template.
     * @private
     */
    private resolveExtraSelection_;
    /**
     * Build the tile grid and the per-level band layout. Every store is read as a
     * stack of levels holding n-dimensional arrays: in `variable` mode all bands
     * are slices of one array, otherwise each band has an array of its own.
     * @param {Object<string, *>} attributes The dataset attributes.
     * @param {FetchStore} store The store, for metadata requests not covered
     * by consolidated metadata.
     * @return {Promise<boolean>} Whether the tile grid has explicit tile sizes.
     * @private
     */
    private configureLevels_;
    /**
     * Determine the projection from the store metadata: the proj: convention,
     * a CRS code from the multiscale metadata or xarray-style attributes, a
     * `proj4` definition, or (for degree-like extents) EPSG:4326.
     * @param {Object<string, *>} attributes The dataset attributes.
     * @param {string|null} crsHint A CRS code from the multiscale metadata.
     * @param {import("../extent.js").Extent} extent The extent.
     * @return {import("../proj/Projection.js").default} The projection.
     * @private
     */
    private inferProjection_;
    /**
     * Read the first and last value of a 1-dimensional coordinate array.
     * @param {string} levelPath The level group path ('' for the root).
     * @param {string} dimName The dimension (and coordinate array) name.
     * @return {Promise<Array<number>>} The first value, last value, and length.
     * @private
     */
    private readCoordinateEndpoints_;
    /**
     * Resolve a coordinate label to its index by reading the dimension's
     * coordinate array.
     * @param {string} dimName The dimension name.
     * @param {string} label The label to resolve.
     * @param {string} path The coordinate array path, relative to the group.
     * @return {Promise<number>} The index of the label.
     * @private
     */
    private resolveCoordinateLabel_;
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
export type GeoZarrStoreOptions = {
    /**
     * additional key-value pairs of headers to be passed with each request. Key is the header name, value the header value.
     */
    headers?: {
        [x: string]: string;
    } | undefined;
    /**
     * How credentials shall be handled. See
     * https://developer.mozilla.org/en-US/docs/Web/API/fetch for reference and possible values
     */
    credentials?: string | undefined;
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
     * The bands to render, for stores where each
     * band is a separate array. Mutually exclusive with `variable`.  Each entry is either a band name
     * string (single-group mode) or a {@link Band} object specifying both the band name and the
     * group it belongs to (multi-group mode).  In multi-group mode, the first band's group
     * determines the tile grid and must follow at least the proj: and spatial: conventions.
     * If it also has a multiscales layout (all three conventions), multiple resolution levels are
     * supported.  Otherwise a single-resolution tile grid is derived from `spatial:bbox`,
     * `proj:code`, and `spatial:shape` (or the array shape from consolidated metadata).
     * Bands from additional groups do not need to follow any convention; they can be multi-scale
     * (array located at `<matrixId>/<bandName>`) or single-scale (array at the group root).
     */
    bands?: (string | Band)[] | undefined;
    /**
     * Additional options to be passed to
     * [zarrita](https://zarrita.dev/)'s `FetchStore` with each request to the Zarr store.
     */
    storeOptions?: GeoZarrStoreOptions | undefined;
    /**
     * Source projection.
     * If not provided, the GeoZarr metadata will be read for projection information.
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
     * How to slice
     * each non-spatial dimension of the band arrays, keyed by dimension name (e.g. `{time: 0}` for
     * the first time step of a `[time, y, x]` cube). Values are 0-based indices (number) or
     * coordinate labels (string); unlisted dimensions default to index 0. Names come from each
     * array's `dimension_names`, or are the axis position as a string when it has none; use the
     * names from {@link getDimensions}. Labels are resolved against the dimension's coordinate
     * array; if that array cannot be read, pass indices instead. With `variable`, at most one
     * dimension may map to an array of values, whose entries are rendered as separate bands in
     * the given order. Change the selection on the fly with
     * {@link module :ol/source/GeoZarr~GeoZarr#updateDimensions}.
     */
    dimensions?: {
        [x: string]: string | number | (string | number)[];
    } | undefined;
    /**
     * The name of an n-dimensional data array (variable) to
     * render, for stores where all bands are packed into a single array (e.g. a
     * `(time, band, y, x)` datacube). The array must exist within each multiscale level
     * group (or at the group root for single-scale stores). Mutually exclusive with `bands`,
     * and required to select several bands from one dimension through `dimensions`.
     */
    variable?: string | undefined;
    /**
     * Fallback extent of the data, in
     * coordinates of the source projection. Only used when the store neither declares its
     * extent (`spatial:bbox` or `bounds` attributes) nor has coordinate arrays to infer it.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * Fallback orientation: set to `true` when the data is
     * stored south-up (ascending y). Only used when the orientation can neither be read
     * from the store metadata nor inferred from its coordinate arrays.
     */
    flipY?: boolean | undefined;
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
    layout: Array<{
        [x: string]: any;
    }>;
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
};
import DataTileSource from './DataTile.js';
import WMTSTileGrid from '../tilegrid/WMTS.js';
//# sourceMappingURL=GeoZarr.d.ts.map