/**
 * Applies uniforms used in vector rendering
 * @param {import('../../webgl/Helper.js').default} helper Helper
 * @param {import('../../transform.js').Transform} worldToViewTransform Transform
 * @param {import('../../transform.js').Transform} geometryInvertTransform Transform.
 * @param {import('../../Map.js').FrameState} frameState Frame state.
 */
export function applyVectorUniforms(helper: import("../../webgl/Helper.js").default, worldToViewTransform: import("../../transform.js").Transform, geometryInvertTransform: import("../../transform.js").Transform, frameState: import("../../Map.js").FrameState): void;
export namespace VectorUniforms {
    let PATTERN_ORIGIN_X_DOUBLE: string;
    let PATTERN_ORIGIN_Y_DOUBLE: string;
    let PATTERN_SCALE_RATIO_DOUBLE: string;
    let ONE: string;
}
//# sourceMappingURL=vectorUtil.d.ts.map