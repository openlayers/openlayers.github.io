/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these *will* break custom shaders!
 */
export type Attributes = string;
export namespace Attributes {
    let POSITION: string;
    let INDEX: string;
    let SEGMENT_START: string;
    let SEGMENT_END: string;
    let MEASURE_START: string;
    let MEASURE_END: string;
    let PARAMETERS: string;
    let JOIN_ANGLES: string;
    let DISTANCE: string;
}
export default VectorStyleRenderer;
/**
 * A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 */
export type AttributeDefinition = {
    /**
     * Amount of numerical values composing the attribute, either 1, 2, 3 or 4; in case size is > 1, the return value
     * of the callback should be an array; if unspecified, assumed to be a single float value
     */
    size?: number | undefined;
    /**
     * This callback computes the numerical value of the
     * attribute for a given feature.
     */
    callback: (this: import("./MixedGeometryBatch.js").GeometryBatchItem, arg1: import("../../Feature").FeatureLike) => number | Array<number>;
};
export type AttributeDefinitions = {
    [x: string]: AttributeDefinition;
};
export type UniformDefinitions = {
    [x: string]: import("../../webgl/Helper.js").UniformValue;
};
export type WebGLBuffers = {
    /**
     * Array containing indices and vertices buffers for polygons
     */
    polygonBuffers: Array<WebGLArrayBuffer>;
    /**
     * Array containing indices and vertices buffers for line strings
     */
    lineStringBuffers: Array<WebGLArrayBuffer>;
    /**
     * Array containing indices and vertices buffers for points
     */
    pointBuffers: Array<WebGLArrayBuffer>;
    /**
     * Inverse of the transform applied when generating buffers
     */
    invertVerticesTransform: import("../../transform.js").Transform;
};
export type RenderInstructions = {
    /**
     * Polygon instructions; null if nothing to render
     */
    polygonInstructions: Float32Array | null;
    /**
     * LineString instructions; null if nothing to render
     */
    lineStringInstructions: Float32Array | null;
    /**
     * Point instructions; null if nothing to render
     */
    pointInstructions: Float32Array | null;
};
/**
 * An object containing both shaders (vertex and fragment)
 */
export type ShaderProgram = {
    /**
     * Vertex shader source
     */
    vertex: string;
    /**
     * Fragment shader source
     */
    fragment: string;
};
export type AsShaders = {
    /**
     * Shader builder with the appropriate presets.
     */
    builder: import("./ShaderBuilder.js").ShaderBuilder;
    /**
     * Custom attributes made available in the vertex shaders.
     * Default shaders rely on the attributes in {@link Attributes}.
     */
    attributes?: {
        [x: string]: AttributeDefinition;
    } | undefined;
    /**
     * Additional uniforms usable in shaders.
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
};
export type AsRule = {
    /**
     * Style
     */
    style: import("../../style/flat.js").FlatStyle;
    /**
     * Filter
     */
    filter?: import("../../expr/expression.js").EncodedExpression | undefined;
};
export type VectorStyle = AsRule | AsShaders;
/**
 * @typedef {Object} AttributeDefinition A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 * @property {number} [size] Amount of numerical values composing the attribute, either 1, 2, 3 or 4; in case size is > 1, the return value
 * of the callback should be an array; if unspecified, assumed to be a single float value
 * @property {function(this:import("./MixedGeometryBatch.js").GeometryBatchItem, import("../../Feature").FeatureLike):number|Array<number>} callback This callback computes the numerical value of the
 * attribute for a given feature.
 */
/**
 * @typedef {Object<string, AttributeDefinition>} AttributeDefinitions
 * @typedef {Object<string, import("../../webgl/Helper").UniformValue>} UniformDefinitions
 */
/**
 * @typedef {Object} WebGLBuffers
 * @property {Array<WebGLArrayBuffer>} polygonBuffers Array containing indices and vertices buffers for polygons
 * @property {Array<WebGLArrayBuffer>} lineStringBuffers Array containing indices and vertices buffers for line strings
 * @property {Array<WebGLArrayBuffer>} pointBuffers Array containing indices and vertices buffers for points
 * @property {import("../../transform.js").Transform} invertVerticesTransform Inverse of the transform applied when generating buffers
 */
/**
 * @typedef {Object} RenderInstructions
 * @property {Float32Array|null} polygonInstructions Polygon instructions; null if nothing to render
 * @property {Float32Array|null} lineStringInstructions LineString instructions; null if nothing to render
 * @property {Float32Array|null} pointInstructions Point instructions; null if nothing to render
 */
/**
 * @typedef {Object} ShaderProgram An object containing both shaders (vertex and fragment)
 * @property {string} vertex Vertex shader source
 * @property {string} fragment Fragment shader source
 */
/**
 * @typedef {Object} AsShaders
 * @property {import("./ShaderBuilder.js").ShaderBuilder} builder Shader builder with the appropriate presets.
 * @property {AttributeDefinitions} [attributes] Custom attributes made available in the vertex shaders.
 * Default shaders rely on the attributes in {@link Attributes}.
 * @property {UniformDefinitions} [uniforms] Additional uniforms usable in shaders.
 */
/**
 * @typedef {Object} AsRule
 * @property {import('../../style/flat.js').FlatStyle} style Style
 * @property {import("../../expr/expression.js").EncodedExpression} [filter] Filter
 */
/**
 * @typedef {AsRule|AsShaders} VectorStyle
 */
/**
 * @classdesc This class is responsible for:
 * 1. generate WebGL buffers according to a provided style, using a MixedGeometryBatch as input
 * 2. rendering geometries contained in said buffers
 *
 * A layer renderer will typically maintain several of these in order to have several styles rendered separately.
 *
 * A VectorStyleRenderer instance can be created either from a literal style or from shaders using either
 * `VectorStyleRenderer.fromStyle` or `VectorStyleRenderer.fromShaders`. The shaders should not be provided explicitly
 * but instead as a preconfigured ShaderBuilder instance.
 *
 * The `generateBuffers` method returns a promise resolving to WebGL buffers that are intended to be rendered by the
 * same renderer.
 */
declare class VectorStyleRenderer {
    /**
     * @param {VectorStyle} styleOrShaders Literal style or custom shaders
     * @param {import('../../style/flat.js').StyleVariables} variables Style variables
     * @param {import('../../webgl/Helper.js').default} helper Helper
     * @param {boolean} [enableHitDetection] Whether to enable the hit detection (needs compatible shader)
     * @param {import("../../expr/expression.js").ExpressionValue} [filter] Optional filter expression
     */
    constructor(styleOrShaders: VectorStyle, variables: import("../../style/flat.js").StyleVariables, helper: import("../../webgl/Helper.js").default, enableHitDetection?: boolean, filter?: import("../../expr/expression.js").ExpressionValue);
    /**
     * @private
     * @type {import('../../webgl/Helper.js').default}
     */
    private helper_;
    /**
     * @private
     */
    private hitDetectionEnabled_;
    /**
     * @private
     * @type {WebGLProgram}
     */
    private fillProgram_;
    /**
     * @private
     * @type {WebGLProgram}
     */
    private strokeProgram_;
    /**
     * @private
     * @type {WebGLProgram}
     */
    private symbolProgram_;
    /**
     * @type {boolean}
     * @private
     */
    private hasFill_;
    /**
     * @private
     */
    private fillVertexShader_;
    /**
     * @private
     */
    private fillFragmentShader_;
    /**
     * @type {boolean}
     * @private
     */
    private hasStroke_;
    /**
     * @private
     */
    private strokeVertexShader_;
    /**
     * @private
     */
    private strokeFragmentShader_;
    /**
     * @type {boolean}
     * @private
     */
    private hasSymbol_;
    /**
     * @private
     */
    private symbolVertexShader_;
    /**
     * @private
     */
    private symbolFragmentShader_;
    /**
     * @type {function(import('../../Feature.js').FeatureLike): boolean}
     * @private
     */
    private featureFilter_;
    /**
     * @private
     */
    private customAttributes_;
    /**
     * @private
     */
    private uniforms_;
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    private polygonAttributesDesc_;
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    private lineStringAttributesDesc_;
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    private pointAttributesDesc_;
    /**
     * Will apply the style filter when generating geometry batches (if it can be evaluated outside a map context)
     * @param {import("../../expr/expression.js").ExpressionValue} filter Style filter
     * @return {function(import('../../Feature.js').FeatureLike): boolean} Feature filter
     * @private
     */
    private computeFeatureFilter;
    /**
     * @param {import('./MixedGeometryBatch.js').default} geometryBatch Geometry batch
     * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
     * @return {Promise<WebGLBuffers|null>} A promise resolving to WebGL buffers; returns null if buffers are empty
     */
    generateBuffers(geometryBatch: import("./MixedGeometryBatch.js").default, transform: import("../../transform.js").Transform): Promise<WebGLBuffers | null>;
    /**
     * @param {import('./MixedGeometryBatch.js').default} geometryBatch Geometry batch
     * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
     * @return {RenderInstructions} Render instructions
     * @private
     */
    private generateRenderInstructions_;
    /**
     * @param {Float32Array|null} renderInstructions Render instructions
     * @param {import("../../geom/Geometry.js").Type} geometryType Geometry type
     * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
     * @return {Promise<Array<WebGLArrayBuffer>>|null} Indices buffer and vertices buffer; null if nothing to render
     * @private
     */
    private generateBuffersForType_;
    /**
     * Render the geometries in the given buffers.
     * @param {WebGLBuffers} buffers WebGL Buffers to draw
     * @param {import("../../Map.js").FrameState} frameState Frame state
     * @param {function(): void} preRenderCallback This callback will be called right before drawing, and can be used to set uniforms
     */
    render(buffers: WebGLBuffers, frameState: import("../../Map.js").FrameState, preRenderCallback: () => void): void;
    /**
     * @param {WebGLArrayBuffer} indicesBuffer Indices buffer
     * @param {WebGLArrayBuffer} verticesBuffer Vertices buffer
     * @param {WebGLProgram} program Program
     * @param {Array<import('../../webgl/Helper.js').AttributeDescription>} attributes Attribute descriptions
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {function(): void} preRenderCallback This callback will be called right before drawing, and can be used to set uniforms
     * @private
     */
    private renderInternal_;
    /**
     * @param {import('../../webgl/Helper.js').default} helper Helper
     * @param {WebGLBuffers} buffers WebGL Buffers to reload if any
     */
    setHelper(helper: import("../../webgl/Helper.js").default, buffers?: WebGLBuffers): void;
}
import WebGLArrayBuffer from '../../webgl/Buffer.js';
//# sourceMappingURL=VectorStyleRenderer.d.ts.map