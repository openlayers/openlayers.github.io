export default ImageStyle;
/**
 * Default placement is `'point'`, meaning the symbolizer is only drawn for `Point`/`MultiPoint`
 * geometries. For a {@link module :ol/geom/LineString~LineString}, {@link module :ol/geom/MultiLineString~MultiLineString},
 * {@link module :ol/geom/Polygon~Polygon} or {@link module :ol/geom/MultiPolygon~MultiPolygon} geometry, set `placement`
 * to `'line'` to draw the symbolizer along the path (only the exterior ring for polygons), repeated at the `repeat`
 * interval when set, and rotated according to `rotateWithView`. A single symbolizer at the geometry's own midpoint,
 * using only the style's own fixed `rotation`, can be obtained with `placement: 'line'`, no `repeat`, and
 * `rotateWithView: false`.
 */
export type ImageStylePlacement = "point" | "line";
export type Options = {
    /**
     * Opacity.
     */
    opacity: number;
    /**
     * If the image should get rotated with the view. When `placement` is set to
     * `'line'`, this also controls whether the symbolizer follows the local direction of the line (`true`) or keeps
     * its own fixed `rotation` (`false`).
     */
    rotateWithView: boolean;
    /**
     * Rotation.
     */
    rotation: number;
    /**
     * Scale.
     */
    scale: number | import("../size.js").Size;
    /**
     * Displacement.
     */
    displacement: Array<number>;
    /**
     * Placement.
     */
    placement?: ImageStylePlacement | undefined;
    /**
     * Repeat interval. When set, the symbolizer will be repeated at this interval, which
     * specifies the distance between two anchors in pixels. Only available when `placement` is set to `'line'`.
     */
    repeat?: number | undefined;
    /**
     * Declutter mode: `declutter`, `obstacle`, `none`.
     */
    declutterMode?: import("../style/Style.js").DeclutterMode | undefined;
};
/**
 * @typedef {'point' | 'line'} ImageStylePlacement
 * Default placement is `'point'`, meaning the symbolizer is only drawn for `Point`/`MultiPoint`
 * geometries. For a {@link module:ol/geom/LineString~LineString}, {@link module:ol/geom/MultiLineString~MultiLineString},
 * {@link module:ol/geom/Polygon~Polygon} or {@link module:ol/geom/MultiPolygon~MultiPolygon} geometry, set `placement`
 * to `'line'` to draw the symbolizer along the path (only the exterior ring for polygons), repeated at the `repeat`
 * interval when set, and rotated according to `rotateWithView`. A single symbolizer at the geometry's own midpoint,
 * using only the style's own fixed `rotation`, can be obtained with `placement: 'line'`, no `repeat`, and
 * `rotateWithView: false`.
 */
/**
 * @typedef {Object} Options
 * @property {number} opacity Opacity.
 * @property {boolean} rotateWithView If the image should get rotated with the view. When `placement` is set to
 * `'line'`, this also controls whether the symbolizer follows the local direction of the line (`true`) or keeps
 * its own fixed `rotation` (`false`).
 * @property {number} rotation Rotation.
 * @property {number|import("../size.js").Size} scale Scale.
 * @property {Array<number>} displacement Displacement.
 * @property {ImageStylePlacement} [placement='point'] Placement.
 * @property {number} [repeat] Repeat interval. When set, the symbolizer will be repeated at this interval, which
 * specifies the distance between two anchors in pixels. Only available when `placement` is set to `'line'`.
 * @property {import('../style/Style.js').DeclutterMode} [declutterMode] Declutter mode: `declutter`, `obstacle`, `none`.
 */
/**
 * @classdesc
 * A base class used for creating subclasses and not instantiated in
 * apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
 * {@link module:ol/style/RegularShape~RegularShape}.
 * @abstract
 * @api
 */
declare class ImageStyle {
    /**
     * @param {Options} options Options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {number}
     */
    private opacity_;
    /**
     * @private
     * @type {boolean}
     */
    private rotateWithView_;
    /**
     * @private
     * @type {number}
     */
    private rotation_;
    /**
     * @private
     * @type {number|import("../size.js").Size}
     */
    private scale_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private scaleArray_;
    /**
     * @private
     * @type {Array<number>}
     */
    private displacement_;
    /**
     * @private
     * @type {ImageStylePlacement}
     */
    private placement_;
    /**
     * @private
     * @type {number|undefined}
     */
    private repeat_;
    /**
     * @private
     * @type {import('../style/Style.js').DeclutterMode|undefined}
     */
    private declutterMode_;
    /**
     * Clones the style.
     * @return {ImageStyle} The cloned style.
     * @api
     */
    clone(): ImageStyle;
    /**
     * Get the symbolizer opacity.
     * @return {number} Opacity.
     * @api
     */
    getOpacity(): number;
    /**
     * Determine whether the symbolizer rotates with the map.
     * @return {boolean} Rotate with map.
     * @api
     */
    getRotateWithView(): boolean;
    /**
     * Get the symoblizer rotation.
     * @return {number} Rotation.
     * @api
     */
    getRotation(): number;
    /**
     * Get the symbolizer scale.
     * @return {number|import("../size.js").Size} Scale.
     * @api
     */
    getScale(): number | import("../size.js").Size;
    /**
     * Get the symbolizer scale array.
     * @return {import("../size.js").Size} Scale array.
     */
    getScaleArray(): import("../size.js").Size;
    /**
     * Get the displacement of the shape
     * @return {Array<number>} Shape's center displacement
     * @api
     */
    getDisplacement(): Array<number>;
    /**
     * Get the declutter mode of the shape
     * @return {import("./Style.js").DeclutterMode|undefined} Shape's declutter mode
     * @api
     */
    getDeclutterMode(): import("./Style.js").DeclutterMode | undefined;
    /**
     * Get the placement.
     * @return {ImageStylePlacement} Placement.
     * @api
     */
    getPlacement(): ImageStylePlacement;
    /**
     * Set the placement.
     *
     * @param {ImageStylePlacement} placement Placement.
     * @api
     */
    setPlacement(placement: ImageStylePlacement): void;
    /**
     * Get the repeat interval.
     * @return {number|undefined} Repeat interval in pixels.
     * @api
     */
    getRepeat(): number | undefined;
    /**
     * Set the repeat interval.
     * @param {number|undefined} [repeat] Repeat interval in pixels.
     * @api
     */
    setRepeat(repeat?: number | undefined): void;
    /**
     * Get the anchor point in pixels. The anchor determines the center point for the
     * symbolizer.
     * @abstract
     * @return {Array<number>|null} Anchor.
     */
    getAnchor(): Array<number> | null;
    /**
     * Get the image element for the symbolizer.
     * @abstract
     * @param {number} pixelRatio Pixel ratio.
     * @return {import('../DataTile.js').ImageLike} Image element.
     */
    getImage(pixelRatio: number): import("../DataTile.js").ImageLike;
    /**
     * @abstract
     * @return {import('../DataTile.js').ImageLike} Image element.
     */
    getHitDetectionImage(): import("../DataTile.js").ImageLike;
    /**
     * Get the image pixel ratio.
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Pixel ratio.
     */
    getPixelRatio(pixelRatio: number): number;
    /**
     * @abstract
     * @return {import("../ImageState.js").default} Image state.
     */
    getImageState(): any;
    /**
     * @abstract
     * @return {import("../size.js").Size|null} Image size.
     */
    getImageSize(): import("../size.js").Size | null;
    /**
     * Get the origin of the symbolizer.
     * @abstract
     * @return {Array<number>|null} Origin.
     */
    getOrigin(): Array<number> | null;
    /**
     * Get the size of the symbolizer (in pixels).
     * @abstract
     * @return {import("../size.js").Size|null} Size.
     */
    getSize(): import("../size.js").Size | null;
    /**
     * Set the displacement.
     *
     * @param {Array<number>} displacement Displacement.
     * @api
     */
    setDisplacement(displacement: Array<number>): void;
    /**
     * Set the opacity.
     *
     * @param {number} opacity Opacity.
     * @api
     */
    setOpacity(opacity: number): void;
    /**
     * Set whether to rotate the style with the view.
     *
     * @param {boolean} rotateWithView Rotate with map.
     * @api
     */
    setRotateWithView(rotateWithView: boolean): void;
    /**
     * Set the rotation.
     *
     * @param {number} rotation Rotation.
     * @api
     */
    setRotation(rotation: number): void;
    /**
     * Set the scale.
     *
     * @param {number|import("../size.js").Size} scale Scale.
     * @api
     */
    setScale(scale: number | import("../size.js").Size): void;
    /**
     * @abstract
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    listenImageChange(listener: (arg0: import("../events/Event.js").default) => void): void;
    /**
     * Load not yet loaded URI.
     * @abstract
     */
    load(): void;
    /**
     * @abstract
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    unlistenImageChange(listener: (arg0: import("../events/Event.js").default) => void): void;
    /**
     * @return {Promise<void>} `false` or Promise that resolves when the style is ready to use.
     */
    ready(): Promise<void>;
}
//# sourceMappingURL=Image.d.ts.map