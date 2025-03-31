export default WebGLPointsLayer;
export type Options<VectorSourceType extends import("../source/Vector.js").default<import("../Feature").FeatureLike>> = {
    /**
     * Literal style to apply to the layer features.
     */
    style: import("../style/flat.js").FlatStyle;
    /**
     * The filter used
     * to determine if a style applies. If no filter is included, the rule always applies.
     */
    filter?: import("../expr/expression.js").EncodedExpression | undefined;
    /**
     * Style variables. Each variable must hold a literal value (not
     * an expression). These variables can be used as {@link import ("../expr/expression.js").ExpressionValue expressions} in the styles properties
     * using the `['var', 'varName']` operator.
     * To update style variables, use the {@link import ("./WebGLPoints.js").default#updateStyleVariables} method.
     */
    variables?: {
        [x: string]: string | number | boolean | number[];
    } | undefined;
    /**
     * A CSS class name to set to the layer element.
     */
    className?: string | undefined;
    /**
     * Opacity (0, 1).
     */
    opacity?: number | undefined;
    /**
     * Visibility.
     */
    visible?: boolean | undefined;
    /**
     * The bounding extent for layer rendering.  The layer will not be
     * rendered outside of this extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * The z-index for layer rendering.  At rendering time, the layers
     * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
     * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
     * method was used.
     */
    zIndex?: number | undefined;
    /**
     * The minimum resolution (inclusive) at which this layer will be
     * visible.
     */
    minResolution?: number | undefined;
    /**
     * The maximum resolution (exclusive) below which this layer will
     * be visible.
     */
    maxResolution?: number | undefined;
    /**
     * The minimum view zoom level (exclusive) above which this layer will be
     * visible.
     */
    minZoom?: number | undefined;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number | undefined;
    /**
     * Point source.
     */
    source?: VectorSourceType | undefined;
    /**
     * Setting this to true will provide a slight performance boost, but will
     * prevent all hit detection on the layer.
     */
    disableHitDetection?: boolean | undefined;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    } | undefined;
};
/**
 * @template {import("../source/Vector.js").default<import('../Feature').FeatureLike>} VectorSourceType
 * @typedef {Object} Options
 * @property {import('../style/flat.js').FlatStyle} style Literal style to apply to the layer features.
 * @property {import("../expr/expression.js").EncodedExpression} [filter] The filter used
 * to determine if a style applies. If no filter is included, the rule always applies.
 * @property {import('../style/flat.js').StyleVariables} [variables] Style variables. Each variable must hold a literal value (not
 * an expression). These variables can be used as {@link import("../expr/expression.js").ExpressionValue expressions} in the styles properties
 * using the `['var', 'varName']` operator.
 * To update style variables, use the {@link import("./WebGLPoints.js").default#updateStyleVariables} method.
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {VectorSourceType} [source] Point source.
 * @property {boolean} [disableHitDetection=false] Setting this to true will provide a slight performance boost, but will
 * prevent all hit detection on the layer.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @classdesc
 * Layer optimized for rendering large point datasets. Takes a `style` property which
 * is a serializable JSON object describing how the layer should be rendered.
 *
 * Here are a few samples of literal style objects:
 * ```js
 * const style = {
 *   'circle-radius': 8,
 *   'circle-fill-color': '#33AAFF',
 *   'circle-opacity': 0.9
 * }
 * ```
 *
 * ```js
 * const style = {
 *   'icon-src': '../static/exclamation-mark.png',
 *   'icon-offset': [0, 12],
 *   'icon-width': 4,
 *   'icon-height': 8
 * }
 * ```
 *
 * **Important: a `WebGLPoints` layer must be manually disposed when removed, otherwise the underlying WebGL context
 * will not be garbage collected.**
 *
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default<import('../Feature').FeatureLike>} VectorSourceType
 * @extends {Layer<VectorSourceType, WebGLPointsLayerRenderer>}
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 * @deprecated Use ol/layer/WebGLVector instead
 */
declare class WebGLPointsLayer<VectorSourceType extends import("../source/Vector.js").default<import("../Feature").FeatureLike>> extends Layer<VectorSourceType, WebGLPointsLayerRenderer> {
    /**
     * @param {Options<VectorSourceType>} options Options.
     */
    constructor(options: Options<VectorSourceType>);
    /**
     * @type {import('../style/flat.js').StyleVariables}
     * @private
     */
    private styleVariables_;
    /**
     * @private
     * @type {import('../render/webgl/style.js').StyleParseResult}
     */
    private parseResult_;
    /**
     * @private
     * @type {boolean}
     */
    private hitDetectionDisabled_;
    /**
     * Update any variables used by the layer style and trigger a re-render.
     * @param {Object<string, number>} variables Variables to update.
     */
    updateStyleVariables(variables: {
        [x: string]: number;
    }): void;
}
import WebGLPointsLayerRenderer from '../renderer/webgl/PointsLayer.js';
import Layer from './Layer.js';
//# sourceMappingURL=WebGLPoints.d.ts.map