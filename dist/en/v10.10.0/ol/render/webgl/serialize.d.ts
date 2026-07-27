/**
 * This will serialize a frame state into a cloneable object.
 * Note: the user projection is written as code in the frame state because it won't be available in the worker.
 * Caveat: this won't work for custom/non-standard projections!
 * @param {import("../../Map.js").FrameState} frameState Frame state
 * @return {Object} Serialized as object
 */
export function serializeFrameState(frameState: import("../../Map.js").FrameState): any;
/**
 * @param {Object} serialized Serialized frame state
 * @return {import("../../Map.js").FrameState} Frame state
 */
export function deserializeFrameState(serialized: any): import("../../Map.js").FrameState;
//# sourceMappingURL=serialize.d.ts.map