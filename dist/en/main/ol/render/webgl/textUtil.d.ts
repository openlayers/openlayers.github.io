/**
 * @param {import('../../style/flat.js').FlatStyleLike} style Single flat style
 * @return {boolean} Whether the style has text-related properties
 */
export function hasTextStyle(style: import("../../style/flat.js").FlatStyleLike): boolean;
/**
 * @param {import('../../style/flat.js').FlatStyleLike} style Single flat style
 * @return {import('../../style/flat.js').FlatStyleLike} Style with text-related properties only;
 * NOTE: THIS MUTATES THE OBJECT
 */
export function stripNonTextStyleProperties(style: import("../../style/flat.js").FlatStyleLike): import("../../style/flat.js").FlatStyleLike;
/**
 * @param {function(): HTMLCanvasElement} textOverlayCanvasGetter Function that returns the canvas where the text overlay was rendered
 * @param {function(): import('../../Map.js').FrameState} textOverlayFrameStateGetter Function that returns the frame state used for rendering the text overlay
 * @return {import("../../renderer/webgl/Layer.js").PostProcessesOptions} Post-process definition for text rendering
 */
export function createPostProcessDefinition(textOverlayCanvasGetter: () => HTMLCanvasElement, textOverlayFrameStateGetter: () => import("../../Map.js").FrameState): import("../../renderer/webgl/Layer.js").PostProcessesOptions;
/**
 * Uses a Canvas Text Builder to render labels for polygons described in a RenderInstructions typed array
 * @param {Float32Array} renderInstructions Array of render instructions for polygons.
 * @param {Uint8Array} labels Integer array containing encoded labels (from LabelsArray)
 * @param {Map<string,import('../../expr/expression.js').ValueType>} properties Properties
 * @param {import('./VectorStyleRenderer.js').AttributeDefinitions} customAttributes Custom attributes definitions
 * @param {import('../canvas/TextBuilder.js').default} textBuilder Text builder
 * @param {import('../../style/Style.js').StyleFunction} styleFunction Text style
 * @private
 */
export function convertPolygonRenderInstructionsToCanvasTextBuilder(renderInstructions: Float32Array, labels: Uint8Array, properties: Map<string, import("../../expr/expression.js").ValueType>, customAttributes: import("./VectorStyleRenderer.js").AttributeDefinitions, textBuilder: import("../canvas/TextBuilder.js").default, styleFunction: import("../../style/Style.js").StyleFunction): void;
/**
 Uses a Canvas Text Builder to render labels for line strings described in a RenderInstructions typed array
 * @param {Float32Array} renderInstructions Array of render instructions for lines.
 * @param {Uint8Array} labels Integer array containing encoded labels (from LabelsArray)
 * @param {Map<string,import('../../expr/expression.js').ValueType>} properties Properties
 * @param {import('./VectorStyleRenderer.js').AttributeDefinitions} customAttributes Custom attributes definitions
 * @param {import('../canvas/TextBuilder.js').default} textBuilder Text builder
 * @param {import('../../style/Style.js').StyleFunction} styleFunction Text style
 * @private
 */
export function convertLineStringRenderInstructionsToCanvasTextBuilder(renderInstructions: Float32Array, labels: Uint8Array, properties: Map<string, import("../../expr/expression.js").ValueType>, customAttributes: import("./VectorStyleRenderer.js").AttributeDefinitions, textBuilder: import("../canvas/TextBuilder.js").default, styleFunction: import("../../style/Style.js").StyleFunction): void;
/**
 Uses a Canvas Text Builder to render labels for points described in a RenderInstructions typed array
 * @param {Float32Array} renderInstructions Array of render instructions for points.
 * @param {Uint8Array} labels Integer array containing encoded labels (from LabelsArray)
 * @param {Map<string,import('../../expr/expression.js').ValueType>} properties Properties
 * @param {import('./VectorStyleRenderer.js').AttributeDefinitions} customAttributes Custom attributes definitions
 * @param {import('../canvas/TextBuilder.js').default} textBuilder Text builder
 * @param {import('../../style/Style.js').StyleFunction} styleFunction Text style
 * @private
 */
export function convertPointRenderInstructionsToCanvasTextBuilder(renderInstructions: Float32Array, labels: Uint8Array, properties: Map<string, import("../../expr/expression.js").ValueType>, customAttributes: import("./VectorStyleRenderer.js").AttributeDefinitions, textBuilder: import("../canvas/TextBuilder.js").default, styleFunction: import("../../style/Style.js").StyleFunction): void;
export namespace TextUniforms {
    let TEXT_OVERLAY_TEXTURE: string;
    let TEXT_OVERLAY_MATRIX: string;
}
//# sourceMappingURL=textUtil.d.ts.map