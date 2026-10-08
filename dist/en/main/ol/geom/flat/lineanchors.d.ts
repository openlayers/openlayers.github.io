/**
 * Compute evenly-spaced anchor points along a line (or ring), without allocating
 * per-chunk coordinate arrays. The number of anchors is the closest whole number of
 * `repeatLength`-sized intervals that fit the line's total length, so spacing is always
 * even (no short leftover interval at the end).
 * @param {number} repeatLength Nominal length of each interval.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Start offset of the `flatCoordinates`.
 * @param {number} end End offset of the `flatCoordinates`.
 * @param {number} stride Stride.
 * @param {boolean|undefined} withRotation Also compute each anchor's tangent rotation,
 * from the start/end of its own interval.
 * @return {Array<number>} Flat `[x0, y0, x1, y1, ...]`, or when `withRotation` is `true`,
 * flat `[x0, y0, rotation0, x1, y1, rotation1, ...]`.
 */
export function lineAnchors(repeatLength: number, flatCoordinates: Array<number>, offset: number, end: number, stride: number, withRotation: boolean | undefined): Array<number>;
//# sourceMappingURL=lineanchors.d.ts.map