/**
 * This will serialize a frame state into a cloneable object.
 * Note: the user projection is written as code in the frame state because it won't be available in the worker.
 * Caveat: this won't work for custom/non-standard projections!
 * @param {import("../../Map.js").FrameState} frameState Frame state
 * @return {Object} Serialized as object
 */
export function serializeFrameState(frameState: import("../../Map.js").FrameState): any;
/**
 * @typedef {Object} SerializedFrameState
 * @property {Object} viewState View state with projection code.
 * @property {Array<number>} viewHints View hints.
 * @property {number} pixelRatio Pixel ratio.
 * @property {Array<number>} size Size.
 * @property {import("../../extent.js").Extent} extent Extent.
 * @property {import("../../transform.js").Transform} coordinateToPixelTransform Transform.
 * @property {import("../../transform.js").Transform} pixelToCoordinateTransform Transform.
 * @property {Array<Object>} layerStatesArray Layer states.
 * @property {number} time Time.
 * @property {number} layerIndex Layer index.
 */
/**
 * @param {SerializedFrameState} serialized Serialized frame state
 * @return {import("../../Map.js").FrameState} Frame state
 */
export function deserializeFrameState(serialized: SerializedFrameState): import("../../Map.js").FrameState;
export type SerializedFrameState = {
    /**
     * View state with projection code.
     */
    viewState: any;
    /**
     * View hints.
     */
    viewHints: Array<number>;
    /**
     * Pixel ratio.
     */
    pixelRatio: number;
    /**
     * Size.
     */
    size: Array<number>;
    /**
     * Extent.
     */
    extent: import("../../extent.js").Extent;
    /**
     * Transform.
     */
    coordinateToPixelTransform: import("../../transform.js").Transform;
    /**
     * Transform.
     */
    pixelToCoordinateTransform: import("../../transform.js").Transform;
    /**
     * Layer states.
     */
    layerStatesArray: Array<any>;
    /**
     * Time.
     */
    time: number;
    /**
     * Layer index.
     */
    layerIndex: number;
};
//# sourceMappingURL=serialize.d.ts.map