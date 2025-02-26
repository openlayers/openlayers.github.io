export const Uniforms: {
    RENDER_EXTENT: string;
    PATTERN_ORIGIN: string;
    GLOBAL_ALPHA: string;
    PROJECTION_MATRIX: string;
    SCREEN_TO_WORLD_MATRIX: string;
    TIME: string;
    ZOOM: string;
    RESOLUTION: string;
    ROTATION: string;
    VIEWPORT_SIZE_PX: string;
    PIXEL_RATIO: string;
    HIT_DETECTION: string;
};
export default WebGLVectorLayerRenderer;
export type StyleAsShaders = import("../../render/webgl/VectorStyleRenderer.js").AsShaders;
export type StyleAsRule = import("../../render/webgl/VectorStyleRenderer.js").AsRule;
export type Options = {
    /**
     * A CSS class name to set to the canvas element.
     */
    className?: string | undefined;
    /**
     * Flat vector style; also accepts shaders
     */
    style: import("../../style/flat.js").FlatStyleLike | Array<StyleAsShaders> | StyleAsShaders;
    /**
     * Style variables
     */
    variables: {
        [x: string]: string | number | boolean | number[];
    };
    /**
     * Setting this to true will provide a slight performance boost, but will
     * prevent all hit detection on the layer.
     */
    disableHitDetection?: boolean | undefined;
    /**
     * Post-processes definitions
     */
    postProcesses?: import("./Layer.js").PostProcessesOptions[] | undefined;
};
/**
 * @typedef {import('../../render/webgl/VectorStyleRenderer.js').AsShaders} StyleAsShaders
 */
/**
 * @typedef {import('../../render/webgl/VectorStyleRenderer.js').AsRule} StyleAsRule
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {import('../../style/flat.js').FlatStyleLike | Array<StyleAsShaders> | StyleAsShaders} style Flat vector style; also accepts shaders
 * @property {Object<string, number|Array<number>|string|boolean>} variables Style variables
 * @property {boolean} [disableHitDetection=false] Setting this to true will provide a slight performance boost, but will
 * prevent all hit detection on the layer.
 * @property {Array<import("./Layer").PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * Experimental WebGL vector renderer. Supports polygons, lines and points:
 *  Polygons are broken down into triangles
 *  Lines are rendered as strips of quads
 *  Points are rendered as quads
 *
 * You need to provide vertex and fragment shaders as well as custom attributes for each type of geometry. All shaders
 * can access the uniforms in the {@link module:ol/webgl/Helper~DefaultUniform} enum.
 * The vertex shaders can access the following attributes depending on the geometry type:
 *  For polygons: {@link module:ol/render/webgl/PolygonBatchRenderer~Attributes}
 *  For line strings: {@link module:ol/render/webgl/LineStringBatchRenderer~Attributes}
 *  For points: {@link module:ol/render/webgl/PointBatchRenderer~Attributes}
 *
 * Please note that the fragment shaders output should have premultiplied alpha, otherwise visual anomalies may occur.
 *
 * Note: this uses {@link module:ol/webgl/Helper~WebGLHelper} internally.
 */
declare class WebGLVectorLayerRenderer extends WebGLLayerRenderer<any> {
    /**
     * @param {import("../../layer/Layer.js").default} layer Layer.
     * @param {Options} options Options.
     */
    constructor(layer: import("../../layer/Layer.js").default, options: Options);
    /**
     * @type {boolean}
     * @private
     */
    private hitDetectionEnabled_;
    /**
     * @type {WebGLRenderTarget}
     * @private
     */
    private hitRenderTarget_;
    /**
     * @private
     */
    private sourceRevision_;
    /**
     * @private
     */
    private previousExtent_;
    /**
     * This transform is updated on every frame and is the composition of:
     * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
     * - current world->screen transform
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private currentTransform_;
    /**
     * @private
     */
    private tmpCoords_;
    /**
     * @private
     */
    private tmpTransform_;
    /**
     * @private
     */
    private tmpMat4_;
    /**
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private currentFrameStateTransform_;
    /**
     * @type {import('../../style/flat.js').StyleVariables}
     * @private
     */
    private styleVariables_;
    /**
     * @type {Array<StyleAsRule | StyleAsShaders>}
     * @private
     */
    private styles_;
    /**
     * @type {Array<VectorStyleRenderer>}
     * @private
     */
    private styleRenderers_;
    /**
     * @type {Array<import('../../render/webgl/VectorStyleRenderer.js').WebGLBuffers>}
     * @private
     */
    private buffers_;
    /**
     * @private
     */
    private batch_;
    /**
     * @private
     * @type {boolean}
     */
    private initialFeaturesAdded_;
    /**
     * @private
     * @type {Array<import("../../events.js").EventsKey|null>}
     */
    private sourceListenKeys_;
    /**
     * @private
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    private addInitialFeatures_;
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
     * @override
     */
    override reset(options: any): void;
    /**
     * @param {import("../../proj.js").TransformFunction} projectionTransform Transform function.
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceFeatureAdded_;
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceFeatureChanged_;
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceFeatureDelete_;
    /**
     * @private
     */
    private handleSourceFeatureClear_;
    /**
     * @param {import("../../transform.js").Transform} batchInvertTransform Inverse of the transformation in which geometries are expressed
     * @private
     */
    private applyUniforms_;
    /**
     * Render the layer.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     * @override
     */
    override renderFrame(frameState: import("../../Map.js").FrameState): HTMLElement;
    /**
     * Render the world, either to the main framebuffer or to the hit framebuffer
     * @param {import("../../Map.js").FrameState} frameState current frame state
     * @param {boolean} forHitDetection whether the rendering is for hit detection
     * @param {number} startWorld the world to render in the first iteration
     * @param {number} endWorld the last world to render
     * @param {number} worldWidth the width of the worlds being rendered
     */
    renderWorlds(frameState: import("../../Map.js").FrameState, forHitDetection: boolean, startWorld: number, endWorld: number, worldWidth: number): void;
    /**
     * Will release a set of Webgl buffers
     * @param {import('../../render/webgl/VectorStyleRenderer.js').WebGLBuffers} buffers Buffers
     */
    disposeBuffers(buffers: import("../../render/webgl/VectorStyleRenderer.js").WebGLBuffers): void;
    renderDeclutter(): void;
}
import WebGLLayerRenderer from './Layer.js';
//# sourceMappingURL=VectorLayer.d.ts.map