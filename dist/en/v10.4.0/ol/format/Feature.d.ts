/**
 * @template {import("../geom/Geometry.js").default|RenderFeature} T
 * @param {T} geometry Geometry.
 * @param {boolean} write Set to true for writing, false for reading.
 * @param {WriteOptions|ReadOptions} [options] Options.
 * @return {T} Transformed geometry.
 */
export function transformGeometryWithOptions<T extends import("../geom/Geometry.js").default | RenderFeature>(geometry: T, write: boolean, options?: WriteOptions | ReadOptions): T;
/**
 * @param {import("../extent.js").Extent} extent Extent.
 * @param {ReadOptions} [options] Read options.
 * @return {import("../extent.js").Extent} Transformed extent.
 */
export function transformExtentWithOptions(extent: import("../extent.js").Extent, options?: ReadOptions): import("../extent.js").Extent;
/**
 * @param {FeatureObject} object Feature object.
 * @param {WriteOptions|ReadOptions} [options] Options.
 * @return {RenderFeature|Array<RenderFeature>} Render feature.
 */
export function createRenderFeature(object: FeatureObject, options?: WriteOptions | ReadOptions): RenderFeature | Array<RenderFeature>;
/**
 * @param {GeometryObject|null} object Geometry object.
 * @param {WriteOptions|ReadOptions} [options] Options.
 * @return {import("../geom/Geometry.js").default} Geometry.
 */
export function createGeometry(object: GeometryObject | null, options?: WriteOptions | ReadOptions): import("../geom/Geometry.js").default;
export default FeatureFormat;
export type ReadOptions = {
    /**
     * Projection of the data we are reading.
     * If not provided, the projection will be derived from the data (where possible) or
     * the `dataProjection` of the format is assigned (where set). If the projection
     * can not be derived from the data and if no `dataProjection` is set for a format,
     * the features will not be reprojected.
     */
    dataProjection?: import("../proj.js").ProjectionLike;
    /**
     * Tile extent in map units of the tile being read.
     * This is only required when reading data with tile pixels as geometry units. When configured,
     * a `dataProjection` with `TILE_PIXELS` as `units` and the tile's pixel extent as `extent` needs to be
     * provided.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * Projection of the feature geometries
     * created by the format reader. If not provided, features will be returned in the
     * `dataProjection`.
     */
    featureProjection?: import("../proj.js").ProjectionLike;
};
export type WriteOptions = {
    /**
     * Projection of the data we are writing.
     * If not provided, the `dataProjection` of the format is assigned (where set).
     * If no `dataProjection` is set for a format, the features will be returned
     * in the `featureProjection`.
     */
    dataProjection?: import("../proj.js").ProjectionLike;
    /**
     * Projection of the feature geometries
     * that will be serialized by the format writer. If not provided, geometries are assumed
     * to be in the `dataProjection` if that is set; in other words, they are not transformed.
     */
    featureProjection?: import("../proj.js").ProjectionLike;
    /**
     * When writing geometries, follow the right-hand
     * rule for linear ring orientation.  This means that polygons will have counter-clockwise
     * exterior rings and clockwise interior rings.  By default, coordinates are serialized
     * as they are provided at construction.  If `true`, the right-hand rule will
     * be applied.  If `false`, the left-hand rule will be applied (clockwise for
     * exterior and counter-clockwise for interior rings).  Note that not all
     * formats support this.  The GeoJSON format does use this property when writing
     * geometries.
     */
    rightHanded?: boolean | undefined;
    /**
     * Maximum number of decimal places for coordinates.
     * Coordinates are stored internally as floats, but floating-point arithmetic can create
     * coordinates with a large number of decimal places, not generally wanted on output.
     * Set a number here to round coordinates. Can also be used to ensure that
     * coordinates read in can be written back out with the same number of decimals.
     * Default is no rounding.
     */
    decimals?: number | undefined;
};
export type Type = "arraybuffer" | "json" | "text" | "xml";
export type SimpleGeometryObject = {
    /**
     * Type.
     */
    type: import("../geom/Geometry.js").Type;
    /**
     * Flat coordinates.
     */
    flatCoordinates: Array<number>;
    /**
     * Ends or endss.
     */
    ends?: number[] | number[][] | undefined;
    /**
     * Layout.
     */
    layout?: import("../geom/Geometry.js").GeometryLayout | undefined;
};
export type GeometryCollectionObject = Array<GeometryObject>;
export type GeometryObject = SimpleGeometryObject | GeometryCollectionObject;
export type FeatureObject = {
    /**
     * Id.
     */
    id?: string | number | undefined;
    /**
     * Geometry.
     */
    geometry?: GeometryObject | undefined;
    /**
     * Properties.
     */
    properties?: {
        [x: string]: any;
    } | undefined;
};
/**
 * *
 */
export type FeatureToFeatureClass<T extends import("../Feature.js").FeatureLike> = T extends RenderFeature ? typeof RenderFeature : typeof Feature;
/**
 * *
 */
export type FeatureClassToFeature<T extends import("../Feature.js").FeatureClass> = T[keyof T] extends RenderFeature ? RenderFeature : Feature;
import RenderFeature from '../render/Feature.js';
/**
 * @typedef {Object} ReadOptions
 * @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are reading.
 * If not provided, the projection will be derived from the data (where possible) or
 * the `dataProjection` of the format is assigned (where set). If the projection
 * can not be derived from the data and if no `dataProjection` is set for a format,
 * the features will not be reprojected.
 * @property {import("../extent.js").Extent} [extent] Tile extent in map units of the tile being read.
 * This is only required when reading data with tile pixels as geometry units. When configured,
 * a `dataProjection` with `TILE_PIXELS` as `units` and the tile's pixel extent as `extent` needs to be
 * provided.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
 * created by the format reader. If not provided, features will be returned in the
 * `dataProjection`.
 */
/**
 * @typedef {Object} WriteOptions
 * @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are writing.
 * If not provided, the `dataProjection` of the format is assigned (where set).
 * If no `dataProjection` is set for a format, the features will be returned
 * in the `featureProjection`.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
 * that will be serialized by the format writer. If not provided, geometries are assumed
 * to be in the `dataProjection` if that is set; in other words, they are not transformed.
 * @property {boolean} [rightHanded] When writing geometries, follow the right-hand
 * rule for linear ring orientation.  This means that polygons will have counter-clockwise
 * exterior rings and clockwise interior rings.  By default, coordinates are serialized
 * as they are provided at construction.  If `true`, the right-hand rule will
 * be applied.  If `false`, the left-hand rule will be applied (clockwise for
 * exterior and counter-clockwise for interior rings).  Note that not all
 * formats support this.  The GeoJSON format does use this property when writing
 * geometries.
 * @property {number} [decimals] Maximum number of decimal places for coordinates.
 * Coordinates are stored internally as floats, but floating-point arithmetic can create
 * coordinates with a large number of decimal places, not generally wanted on output.
 * Set a number here to round coordinates. Can also be used to ensure that
 * coordinates read in can be written back out with the same number of decimals.
 * Default is no rounding.
 */
/**
 * @typedef {'arraybuffer' | 'json' | 'text' | 'xml'} Type
 */
/**
 * @typedef {Object} SimpleGeometryObject
 * @property {import('../geom/Geometry.js').Type} type Type.
 * @property {Array<number>} flatCoordinates Flat coordinates.
 * @property {Array<number>|Array<Array<number>>} [ends] Ends or endss.
 * @property {import('../geom/Geometry.js').GeometryLayout} [layout] Layout.
 */
/**
 * @typedef {Array<GeometryObject>} GeometryCollectionObject
 */
/**
 * @typedef {SimpleGeometryObject|GeometryCollectionObject} GeometryObject
 */
/**
 * @typedef {Object} FeatureObject
 * @property {string|number} [id] Id.
 * @property {GeometryObject} [geometry] Geometry.
 * @property {Object<string, *>} [properties] Properties.
 */
/***
 * @template {import('../Feature.js').FeatureLike} T
 * @typedef {T extends RenderFeature ? typeof RenderFeature : typeof Feature} FeatureToFeatureClass
 */
/***
 * @template {import("../Feature.js").FeatureClass} T
 * @typedef {T[keyof T] extends RenderFeature ? RenderFeature : Feature} FeatureClassToFeature
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for feature formats.
 * {@link module:ol/format/Feature~FeatureFormat} subclasses provide the ability to decode and encode
 * {@link module:ol/Feature~Feature} objects from a variety of commonly used geospatial
 * file formats.  See the documentation for each format for more details.
 *
 * @template {import('../Feature.js').FeatureLike} [FeatureType=import("../Feature.js").default]
 * @abstract
 * @api
 */
declare class FeatureFormat<FeatureType extends import("../Feature.js").FeatureLike = Feature<import("../geom.js").Geometry>> {
    /**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */
    protected dataProjection: import("../proj/Projection.js").default | undefined;
    /**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */
    protected defaultFeatureProjection: import("../proj/Projection.js").default | undefined;
    /**
     * @protected
     * @type {FeatureToFeatureClass<FeatureType>}
     */
    protected featureClass: FeatureToFeatureClass<FeatureType>;
    /**
     * A list media types supported by the format in descending order of preference.
     * @type {Array<string>}
     */
    supportedMediaTypes: Array<string>;
    /**
     * Adds the data projection to the read options.
     * @param {Document|Element|Object|string} source Source.
     * @param {ReadOptions} [options] Options.
     * @return {ReadOptions|undefined} Options.
     * @protected
     */
    protected getReadOptions(source: Document | Element | any | string, options?: ReadOptions): ReadOptions | undefined;
    /**
     * Sets the `dataProjection` on the options, if no `dataProjection`
     * is set.
     * @param {WriteOptions|ReadOptions|undefined} options
     *     Options.
     * @protected
     * @return {WriteOptions|ReadOptions|undefined}
     *     Updated options.
     */
    protected adaptOptions(options: WriteOptions | ReadOptions | undefined): WriteOptions | ReadOptions | undefined;
    /**
     * @abstract
     * @return {Type} The format type.
     */
    getType(): Type;
    /**
     * Read a single feature from a source.
     *
     * @abstract
     * @param {Document|Element|Object|string} source Source.
     * @param {ReadOptions} [options] Read options.
     * @return {FeatureType|Array<FeatureType>} Feature.
     */
    readFeature(source: Document | Element | any | string, options?: ReadOptions): FeatureType | Array<FeatureType>;
    /**
     * Read all features from a source.
     *
     * @abstract
     * @param {Document|Element|ArrayBuffer|Object|string} source Source.
     * @param {ReadOptions} [options] Read options.
     * @return {Array<FeatureType>} Features.
     */
    readFeatures(source: Document | Element | ArrayBuffer | any | string, options?: ReadOptions): Array<FeatureType>;
    /**
     * Read a single geometry from a source.
     *
     * @abstract
     * @param {Document|Element|Object|string} source Source.
     * @param {ReadOptions} [options] Read options.
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    readGeometry(source: Document | Element | any | string, options?: ReadOptions): import("../geom/Geometry.js").default;
    /**
     * Read the projection from a source.
     *
     * @abstract
     * @param {Document|Element|Object|string} source Source.
     * @return {import("../proj/Projection.js").default|undefined} Projection.
     */
    readProjection(source: Document | Element | any | string): import("../proj/Projection.js").default | undefined;
    /**
     * Encode a feature in this format.
     *
     * @abstract
     * @param {Feature} feature Feature.
     * @param {WriteOptions} [options] Write options.
     * @return {string|ArrayBuffer} Result.
     */
    writeFeature(feature: Feature, options?: WriteOptions): string | ArrayBuffer;
    /**
     * Encode an array of features in this format.
     *
     * @abstract
     * @param {Array<Feature>} features Features.
     * @param {WriteOptions} [options] Write options.
     * @return {string|ArrayBuffer} Result.
     */
    writeFeatures(features: Array<Feature>, options?: WriteOptions): string | ArrayBuffer;
    /**
     * Write a single geometry in this format.
     *
     * @abstract
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {WriteOptions} [options] Write options.
     * @return {string|ArrayBuffer} Result.
     */
    writeGeometry(geometry: import("../geom/Geometry.js").default, options?: WriteOptions): string | ArrayBuffer;
}
import Feature from '../Feature.js';
//# sourceMappingURL=Feature.d.ts.map