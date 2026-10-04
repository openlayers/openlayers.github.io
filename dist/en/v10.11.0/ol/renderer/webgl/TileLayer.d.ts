export const Uniforms: {
    TILE_TEXTURE_ARRAY: string;
    TEXTURE_PIXEL_WIDTH: string;
    TEXTURE_PIXEL_HEIGHT: string;
    TEXTURE_RESOLUTION: string;
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
    let TEXTURE_COORD: string;
}
export default WebGLTileLayerRenderer;
export type Options = {
    /**
     * Vertex shader source.
     */
    vertexShader: string;
    /**
     * Fragment shader source.
     */
    fragmentShader: string;
    /**
     * Additional uniforms
     * made available to shaders.
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
    /**
     * Palette textures.
     */
    paletteTextures?: import("../../webgl/PaletteTexture.js").default[] | undefined;
    /**
     * The texture cache size.
     */
    cacheSize?: number | undefined;
    /**
     * Post-processes definitions.
     */
    postProcesses?: import("./Layer.js").PostProcessesOptions[] | undefined;
};
export type TileTextureType = import("../../webgl/TileTexture.js").TileType;
export type TileTextureRepresentation = import("../../webgl/TileTexture.js").default;
/**
 * @typedef {Object} Options
 * @property {string} vertexShader Vertex shader source.
 * @property {string} fragmentShader Fragment shader source.
 * @property {Object<string, import("../../webgl/Helper.js").UniformValue>} [uniforms] Additional uniforms
 * made available to shaders.
 * @property {Array<import("../../webgl/PaletteTexture.js").default>} [paletteTextures] Palette textures.
 * @property {number} [cacheSize=512] The texture cache size.
 * @property {Array<import('./Layer.js').PostProcessesOptions>} [postProcesses] Post-processes definitions.
 */
/**
 * @typedef {import("../../webgl/TileTexture.js").TileType} TileTextureType
 */
/**
 * @typedef {import("../../webgl/TileTexture.js").default} TileTextureRepresentation
 */
/**
 * @classdesc
 * WebGL renderer for tile layers.
 * @template {import("../../layer/WebGLTile.js").default|import("../../layer/Flow.js").default} LayerType
 * @extends {WebGLBaseTileLayerRenderer<LayerType, TileTextureType, TileTextureRepresentation>}
 * @api
 */
declare class WebGLTileLayerRenderer<LayerType extends import("../../layer/WebGLTile.js").default | import("../../layer/Flow.js").default> extends WebGLBaseTileLayerRenderer<LayerType, import("../../webgl/TileTexture.js").TileType, TileTexture> {
    /**
     * @param {LayerType} tileLayer Tile layer.
     * @param {Options} options Options.
     */
    constructor(tileLayer: LayerType, options: Options);
    /**
     * @type {WebGLProgram|undefined}
     * @private
     */
    private program_;
    /**
     * @private
     */
    private vertexShader_;
    /**
     * @private
     */
    private fragmentShader_;
    /**
     * @private
     * @type {WebGLArrayBuffer|undefined}
     */
    private indices_;
    /**
     * @type {Array<import("../../webgl/PaletteTexture.js").default>}
     * @private
     */
    private paletteTextures_;
    /**
     * @param {Options} options Options.
     * @override
     */
    override reset(options: Options): void;
}
import TileTexture from '../../webgl/TileTexture.js';
import WebGLBaseTileLayerRenderer from './TileLayerBase.js';
//# sourceMappingURL=TileLayer.d.ts.map