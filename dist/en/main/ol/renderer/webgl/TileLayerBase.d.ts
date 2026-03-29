/**
 * @typedef {import("../../webgl/BaseTileRepresentation.js").default<import("../../Tile.js").default>} AbstractTileRepresentation
 */
/**
 * @typedef {Object} TileRepresentationLookup
 * @property {Set<string>} tileIds The set of tile ids in the lookup.
 * @property {Object<number, Set<AbstractTileRepresentation>>} representationsByZ Tile representations by zoom level.
 */
/**
 * @return {TileRepresentationLookup} A new tile representation lookup.
 */
export function newTileRepresentationLookup(): TileRepresentationLookup;
/**
 * @param {import("../../source/Tile.js").default} source The source.
 * @param {import('../../tilecoord.js').TileCoord} tileCoord The tile coordinate.
 * @return {string} The cache key.
 */
export function getCacheKey(source: import("../../source/Tile.js").default, tileCoord: import("../../tilecoord.js").TileCoord): string;
export const Uniforms: {
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
export default WebGLBaseTileLayerRenderer;
export type AbstractTileRepresentation = import("../../webgl/BaseTileRepresentation.js").default<import("../../Tile.js").default>;
export type TileRepresentationLookup = {
    /**
     * The set of tile ids in the lookup.
     */
    tileIds: Set<string>;
    /**
     * Tile representations by zoom level.
     */
    representationsByZ: {
        [x: number]: Set<import("../../webgl/BaseTileRepresentation.js").default<import("../../Tile.js").default>>;
    };
};
export type Options = {
    /**
     * Additional uniforms
     * made available to shaders.
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
    /**
     * The tile representation cache size.
     */
    cacheSize?: number | undefined;
    /**
     * Post-processes definitions.
     */
    postProcesses?: import("./Layer.js").PostProcessesOptions[] | undefined;
};
export type BaseLayerType = import("../../layer/BaseTile.js").default<any, any>;
/**
 * @typedef {Object} Options
 * @property {Object<string, import("../../webgl/Helper.js").UniformValue>} [uniforms] Additional uniforms
 * made available to shaders.
 * @property {number} [cacheSize=512] The tile representation cache size.
 * @property {Array<import('./Layer.js').PostProcessesOptions>} [postProcesses] Post-processes definitions.
 */
/**
 * @typedef {import("../../layer/BaseTile.js").default} BaseLayerType
 */
/**
 * @classdesc
 * Base WebGL renderer for tile layers.
 * @template {BaseLayerType} LayerType
 * @template {import("../../Tile.js").default} TileType
 * @template {import("../../webgl/BaseTileRepresentation.js").default<TileType>} TileRepresentation
 * @extends {WebGLLayerRenderer<LayerType>}
 */
declare class WebGLBaseTileLayerRenderer<LayerType extends BaseLayerType, TileType extends import("../../Tile.js").default, TileRepresentation extends import("../../webgl/BaseTileRepresentation.js").default<TileType>> extends WebGLLayerRenderer<LayerType> {
    /**
     * @param {LayerType} tileLayer Tile layer.
     * @param {Options} options Options.
     */
    constructor(tileLayer: LayerType, options: Options);
    /**
     * The last call to `renderFrame` was completed with all tiles loaded
     * @type {boolean}
     */
    renderComplete: boolean;
    /**
     * This transform converts representation coordinates to screen coordinates.
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private tileTransform_;
    /**
     * @protected
     */
    protected tmpCoords_: number[];
    /**
     * @protected
     */
    protected tmpCoords2_: number[];
    /**
     * @protected
     */
    protected tmpExtent_: number[];
    /**
     * @protected
     */
    protected tmpTransform_: number[];
    /**
     * @protected
     */
    protected tmpMat4_: import("../../vec/mat4.js").Mat4;
    /**
     * @type {import("../../TileRange.js").default}
     * @private
     */
    private tempTileRange_;
    /**
     * @type {import("../../tilecoord.js").TileCoord}
     * @private
     */
    private tempTileCoord_;
    /**
     * @type {import("../../size.js").Size}
     * @private
     */
    private tempSize_;
    /**
     * @type {import("../../structs/LRUCache.js").default<TileRepresentation>}
     * @protected
     */
    protected tileRepresentationCache: import("../../structs/LRUCache.js").default<TileRepresentation>;
    /**
     * @protected
     * @type {import("../../Map.js").FrameState|null}
     */
    protected frameState: import("../../Map.js").FrameState | null;
    /**
     * @private
     * @type {import("../../proj/Projection.js").default}
     */
    private renderedProjection_;
    /**
     * @private
     * @type {import("../../structs/LRUCache.js").default<import("../../Tile.js").default>|null}
     */
    private sourceTileCache_;
    /**
     * @param {Options} options Options.
     * @override
     */
    override reset(options: Options): void;
    /**
     * @abstract
     * @param {import("../../webgl/BaseTileRepresentation.js").TileRepresentationOptions<TileType>} options tile representation options
     * @return {TileRepresentation} A new tile representation
     * @protected
     */
    protected createTileRepresentation(options: import("../../webgl/BaseTileRepresentation.js").TileRepresentationOptions<TileType>): TileRepresentation;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent The extent to be rendered.
     * @param {number} initialZ The zoom level.
     * @param {TileRepresentationLookup} tileRepresentationLookup The zoom level.
     * @param {number} preload Number of additional levels to load.
     */
    enqueueTiles(frameState: import("../../Map.js").FrameState, extent: import("../../extent.js").Extent, initialZ: number, tileRepresentationLookup: TileRepresentationLookup, preload: number): void;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {boolean} tilesWithAlpha True if at least one of the rendered tiles has alpha
     * @protected
     */
    protected beforeTilesRender(frameState: import("../../Map.js").FrameState, tilesWithAlpha: boolean): void;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {boolean} If returns false, tile mask rendering will be skipped
     * @protected
     */
    protected beforeTilesMaskRender(frameState: import("../../Map.js").FrameState): boolean;
    /**
     * @param {TileRepresentation} tileRepresentation Tile representation
     * @param {import("../../transform.js").Transform} tileTransform Tile transform
     * @param {import("../../Map.js").FrameState} frameState Frame state
     * @param {import("../../extent.js").Extent} renderExtent Render extent
     * @param {number} tileResolution Tile resolution
     * @param {import("../../size.js").Size} tileSize Tile size
     * @param {import("../../coordinate.js").Coordinate} tileOrigin Tile origin
     * @param {import("../../extent.js").Extent} tileExtent tile Extent
     * @param {number} depth Depth
     * @param {number} gutter Gutter
     * @param {number} alpha Alpha
     * @protected
     */
    protected renderTile(tileRepresentation: TileRepresentation, tileTransform: import("../../transform.js").Transform, frameState: import("../../Map.js").FrameState, renderExtent: import("../../extent.js").Extent, tileResolution: number, tileSize: import("../../size.js").Size, tileOrigin: import("../../coordinate.js").Coordinate, tileExtent: import("../../extent.js").Extent, depth: number, gutter: number, alpha: number): void;
    /**
     * @param {TileRepresentation} tileRepresentation Tile representation
     * @param {number} tileZ Tile Z
     * @param {import("../../extent.js").Extent} extent Render extent
     * @param {number} depth Depth
     * @protected
     */
    protected renderTileMask(tileRepresentation: TileRepresentation, tileZ: number, extent: import("../../extent.js").Extent, depth: number): void;
    drawTile_(frameState: any, tileRepresentation: any, tileZ: any, gutter: any, extent: any, alphaLookup: any, tileGrid: any): void;
    /**
     * Render the layer.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     * @override
     */
    override renderFrame(frameState: import("../../Map.js").FrameState): HTMLElement;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @protected
     */
    protected beforeFinalize(frameState: import("../../Map.js").FrameState): void;
    /**
     * Look for tiles covering the provided tile coordinate at an alternate
     * zoom level.  Loaded tiles will be added to the provided tile representation lookup.
     * @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
     * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
     * @param {number} altZ The alternate zoom level.
     * @param {TileRepresentationLookup} tileRepresentationLookup Lookup of
     * tile representations by zoom level.
     * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
     * @private
     */
    private findAltTiles_;
    /**
     * @override
     */
    /**
     * @return {import("../../structs/LRUCache.js").default<import("../../Tile.js").default>} Source tile cache.
     * @private
     */
    private getSourceTileCache_;
    /**
     * Apply the render extent as a uniform; the render extent uniform is expressed in the same coordinate space as the geometries in the render buffers,
     * whereas the input render extent is expressed in full world coordinates.
     * @protected
     * @param {import("../../extent.js").Extent} renderExtent Render extent in map units (world coordinates)
     * @param {import('../../transform.js').Transform} worldToLocalTransform Transform.
     */
    protected applyRenderExtentUniform(renderExtent: import("../../extent.js").Extent, worldToLocalTransform: import("../../transform.js").Transform): void;
}
import WebGLLayerRenderer from './Layer.js';
//# sourceMappingURL=TileLayerBase.d.ts.map