/**
 * Clip flat line strings to the given extent. Parts outside the extent are
 * dropped and a vertex is inserted where a segment crosses the boundary. A line
 * that leaves and re-enters the extent is split into separate parts so that
 * positions derived from the result (e.g. labels placed along the line) stay
 * within the extent. Output coordinates have a stride of 2.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent to clip to.
 * @return {{flatCoordinates: Array<number>, ends: Array<number>}} Clipped flat
 *     coordinates and ends.
 */
export function clipFlatLineStrings(flatCoordinates: Array<number>, ends: Array<number>, stride: number, extent: import("../../extent.js").Extent): {
    flatCoordinates: Array<number>;
    ends: Array<number>;
};
//# sourceMappingURL=clip.d.ts.map