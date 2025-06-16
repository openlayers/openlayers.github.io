export const Uniforms: {
    TILE_MASK_TEXTURE: string;
    TILE_ZOOM_LEVEL: string;
    TILE_TRANSFORM: string;
    TRANSITION_ALPHA: string;
    DEPTH: string;
    RENDER_EXTENT: string;
    PATTERN_ORIGIN: string;
    RESOLUTION: string;
    ZOOM: string;
    GLOBAL_ALPHA: string;
    PROJECTION_MATRIX: string;
    SCREEN_TO_WORLD_MATRIX: string;
};
export namespace Attributes {
    let POSITION: string;
}
export default WebGLVectorTileLayerRenderer;
export type StyleAsShaders = import("../../render/webgl/VectorStyleRenderer.js").AsShaders;
export type StyleAsRule = import("../../render/webgl/VectorStyleRenderer.js").AsRule;
export type Options = {
    /**
     * Flat vector style; also accepts shaders
     */
    style: import("../../style/flat.js").FlatStyleLike | Array<StyleAsShaders> | StyleAsShaders;
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
     * The vector tile cache size.
     */
    cacheSize?: number | undefined;
};
export type LayerType = import("../../layer/BaseTile.js").default<any, any>;
/**
 * @typedef {import('../../render/webgl/VectorStyleRenderer.js').AsShaders} StyleAsShaders
 */
/**
 * @typedef {import('../../render/webgl/VectorStyleRenderer.js').AsRule} StyleAsRule
 */
/**
 * @typedef {Object} Options
 * @property {import('../../style/flat.js').FlatStyleLike | Array<StyleAsShaders> | StyleAsShaders} style Flat vector style; also accepts shaders
 * @property {import('../../style/flat.js').StyleVariables} [variables] Style variables. Each variable must hold a literal value (not
 * an expression). These variables can be used as {@link import("../../expr/expression.js").ExpressionValue expressions} in the styles properties
 * using the `['var', 'varName']` operator.
 * @property {boolean} [disableHitDetection=false] Setting this to true will provide a slight performance boost, but will
 * prevent all hit detection on the layer.
 * @property {number} [cacheSize=512] The vector tile cache size.
 */
/**
 * @typedef {import("../../layer/BaseTile.js").default} LayerType
 */
/**
 * @classdesc
 * WebGL renderer for vector tile layers. Experimental.
 * @extends {WebGLBaseTileLayerRenderer<LayerType>}
 */
declare class WebGLVectorTileLayerRenderer extends WebGLBaseTileLayerRenderer<import("../../layer/BaseTile.js").default<any, any>, any, any> {
    /**
     * @param {LayerType} tileLayer Tile layer.
     * @param {Options} options Options.
     */
    constructor(tileLayer: LayerType, options: Options);
    /**
     * @type {boolean}
     * @private
     */
    private hitDetectionEnabled_;
    /**
     * @type {Array<StyleAsRule | StyleAsShaders>}
     * @private
     */
    private styles_;
    /**
     * @type {import('../../style/flat.js').StyleVariables}
     * @private
     */
    private styleVariables_;
    /**
     * @type {Array<VectorStyleRenderer>}
     * @private
     */
    private styleRenderers_;
    /**
     * This transform is updated on every frame and is the composition of:
     * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
     * - current world->screen transform
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private currentFrameStateTransform_;
    /**
     * @private
     */
    private tmpTransform_;
    /**
     * @private
     */
    private tmpMat4_;
    /**
     * @type {WebGLRenderTarget}
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
     * @type {WebGLProgram}
     * @private
     */
    private tileMaskProgram_;
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
     * @override
     */
    override createTileRepresentation(options: any): TileGeometry;
    /**
     * @override
     */
    override beforeTilesRender(frameState: any, tilesWithAlpha: any): void;
    /**
     * @override
     */
    override beforeTilesMaskRender(frameState: any): boolean;
    /**
     * @override
     */
    override renderTileMask(tileRepresentation: any, tileZ: any, extent: any, depth: any): void;
    /**
     * @param {number} alpha Alpha value of the tile
     * @param {import("../../extent.js").Extent} renderExtent Which extent to restrict drawing to
     * @param {import("../../transform.js").Transform} batchInvertTransform Inverse of the transformation in which tile geometries are expressed
     * @param {number} tileZ Tile zoom level
     * @param {number} depth Depth of the tile
     * @private
     */
    private applyUniforms_;
    /**
     * @override
     */
    override renderTile(tileRepresentation: any, tileTransform: any, frameState: any, renderExtent: any, tileResolution: any, tileSize: any, tileOrigin: any, tileExtent: any, depth: any, gutter: any, alpha: any): void;
    /**
     * Render declutter items for this layer
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    renderDeclutter(frameState: import("../../Map.js").FrameState): void;
}
import WebGLBaseTileLayerRenderer from './TileLayerBase.js';
import TileGeometry from '../../webgl/TileGeometry.js';
//# sourceMappingURL=VectorTileLayer.d.ts.map