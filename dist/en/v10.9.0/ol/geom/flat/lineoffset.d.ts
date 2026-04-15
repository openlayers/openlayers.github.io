/**
 * Offsets a line string to the left / right along its segments direction.
 * Offset is applied to each segment of the line in the direciton of the segment normal (positive offset goes "right" relative to the line direction).
 * For very sharp angles between segments, the function falls back to offsetting along the segment normal direction to avoid excessively long miters.
 *
 * Coordinates and the offset should be in the same units — either pixels or the same spatial reference system as the input line coordinates.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} start Start index.
 * @param {number} end End index.
 * @param {number} stride Stride.
 * @param {number} offset Offset distance along the segment normal direction.
 *   Positive values offset to the right relative to the direction of the line.
 *   Negative values offset to the left.
 * @param {boolean} isClosedRing If coordinates build a closed circle (in this the first and the last coordinate offsets will consider previous / next ring coordinate)
 * @param {Array<number>} [dest] Destination coordinate array. If not provided a new one will be created
 * @param {number} [destinationStride] Stride of destination coordinates. If unspecified, assumed to be same as the source coordinates stride.
 * @return {Array<number>} Result flat coordinates of the offset line.
 */
export function offsetLineString(flatCoordinates: Array<number>, start: number, end: number, stride: number, offset: number, isClosedRing: boolean, dest?: Array<number>, destinationStride?: number): Array<number>;
/**
 * Removes self-intersection loops (cycles) from an offset line.
 * When a polyline is offset, sharp turns can create self-intersecting loops.
 * This function detects those crossings and splices out the looped portions,
 * replacing them with the intersection point.
 *
 * @param {Array<number>} coords Flat offset coordinates (modified in-place).
 * @param {number} stride Coordinate stride (typically 2).
 * @return {Array<number>} The cleaned coordinate array.
 */
export function removeOffsetCycles(coords: Array<number>, stride: number): Array<number>;
//# sourceMappingURL=lineoffset.d.ts.map