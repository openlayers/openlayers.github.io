export const Uniforms: {
    TILE_MASK_TEXTURE: string;
    TILE_ZOOM_LEVEL: string;
    TEXT_OVERLAY_TEXTURE: string;
    TEXT_OVERLAY_MATRIX: string;
    PATTERN_ORIGIN_X_DOUBLE: string;
    PATTERN_ORIGIN_Y_DOUBLE: string;
    PATTERN_SCALE_RATIO_DOUBLE: string;
    ONE: string;
    TILE_TRANSFORM: string;
    TRANSITION_ALPHA: string;
    DEPTH: string;
    RENDER_EXTENT: string;
    GLOBAL_ALPHA: string;
    PROJECTION_MATRIX: string;
    INVERT_PROJECTION_MATRIX: string;
    TIME: string;
    ZOOM: string;
    RESOLUTION: string;
    ROTATION: string;
    VIEWPORT_SIZE_PX: string;
    PIXEL_RATIO: string;
    HIT_DETECTION: string;
};
export namespace Attributes {
    let POSITION: string;
}
export default WebGLVectorTileLayerRenderer;
export type StyleShaders = import("../../render/webgl/VectorStyleRenderer.js").StyleShaders;
export type LayerStyle = import("../../style/flat.js").FlatStyleLike | Array<StyleShaders> | StyleShaders;
export type Options = {
    /**
     * Flat vector style; also accepts shaders
     */
    style: LayerStyle;
    /**
     * Style variables. Each variable must hold a literal value (not
     * an expression). These variables can be used as {@link import ("../../expr/expression.js").ExpressionValue expressions} in the styles properties
     * using the `['var', 'varName']` operator.
     */
    variables?: {
        [x: string]: string | number | boolean | number[];
    } | undefined;
    /**
     * Setting this to true will provide a slight performance boost, but will
     * prevent all hit detection on the layer.
     */
    disableHitDetection?: boolean | undefined;
    /**
     * Post-processes definitions
     */
    postProcesses?: import("./Layer.js").PostProcessesOptions[] | undefined;
    /**
     * The vector tile cache size.
     */
    cacheSize?: number | undefined;
};
export type LayerType = import("../../layer/VectorTile.js").default;
/**
 * @typedef {import('../../render/webgl/VectorStyleRenderer.js').StyleShaders} StyleShaders
 */
/**
 * @typedef {import('../../style/flat.js').FlatStyleLike | Array<StyleShaders> | StyleShaders} LayerStyle
 */
/**
 * @typedef {Object} Options
 * @property {LayerStyle} style Flat vector style; also accepts shaders
 * @property {import('../../style/flat.js').StyleVariables} [variables] Style variables. Each variable must hold a literal value (not
 * an expression). These variables can be used as {@link import("../../expr/expression.js").ExpressionValue expressions} in the styles properties
 * using the `['var', 'varName']` operator.
 * @property {boolean} [disableHitDetection=false] Setting this to true will provide a slight performance boost, but will
 * prevent all hit detection on the layer.
 * @property {Array<import("./Layer.js").PostProcessesOptions>} [postProcesses] Post-processes definitions
 * @property {number} [cacheSize=512] The vector tile cache size.
 */
/**
 * @typedef {import("../../layer/VectorTile.js").default} LayerType
 */
/**
 * @classdesc
 * WebGL renderer for vector tile layers. Experimental.
 * @extends {WebGLBaseTileLayerRenderer<any, import("../../VectorRenderTile.js").default, import("../../webgl/TileGeometry.js").default>}
 */
declare class WebGLVectorTileLayerRenderer extends WebGLBaseTileLayerRenderer<any, import("../../VectorRenderTile.js").default, TileGeometry> {
    /**
     * @param {import("../../layer/VectorTile.js").default} tileLayer Tile layer.
     * @param {Options} options Options.
     */
    constructor(tileLayer: import("../../layer/VectorTile.js").default, options: Options);
    /**
     * @type {boolean}
     * @private
     */
    private hitDetectionEnabled_;
    /**
     * @type {LayerStyle|null}
     * @private
     */
    private style_;
    /**
     * @private
     */
    private hasText_;
    /**
     * @type {import('../../style/flat.js').StyleVariables|undefined}
     * @private
     */
    private styleVariables_;
    /**
     * @type {VectorStyleRenderer|null}
     * @private
     */
    private styleRenderer_;
    /**
     * Transform that projects from world to viewport [-1,1]
     * @private
     */
    private currentFrameStateTransform_;
    /**
     * @type {WebGLRenderTarget|null}
     * @private
     */
    private tileMaskTarget_;
    /**
     * @private
     */
    private tileMaskIndices_;
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    private tileMaskAttributes_;
    /**
     * @type {WebGLProgram|undefined}
     * @private
     */
    private tileMaskProgram_;
    /**
     * @private
     */
    private layerRevision_;
    /**
     * @private
     */
    private skipNextTextRender_;
    /**
     * @param {Options} options Options.
     * @override
     */
    override reset(options: Options): void;
    /**
     * @param {Options} options Options.
     * @private
     */
    private applyOptions_;
    /**
     * @private
     */
    private createRenderers_;
    /**
     * @private
     */
    private initTileMask_;
    /**
     * @param {number} alpha Alpha value of the tile
     * @param {import("../../extent.js").Extent} renderExtent Which extent to restrict drawing to
     * @param {import("../../transform.js").Transform} batchInvertTransform Inverse of the transformation in which tile geometries are expressed
     * @param {number} tileZ Tile zoom level
     * @param {number} depth Depth of the tile
     * @param {import("../../Map.js").FrameState} frameState Frame state
     * @private
     */
    private applyUniforms_;
    /**
     * Render declutter items for this layer
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    renderDeclutter(frameState: import("../../Map.js").FrameState): void;
}
import TileGeometry from '../../webgl/TileGeometry.js';
import WebGLBaseTileLayerRenderer from './TileLayerBase.js';
//# sourceMappingURL=VectorTileLayer.d.ts.map