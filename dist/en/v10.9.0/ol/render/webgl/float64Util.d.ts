/**
 * Returns a low part of a float value that can be encoded to Float32 without recision loss
 * @param {number} float Number in float64 precision
 * @return {number} Low part of the float value
 */
export function getLowPart(float: number): number;
/**
 * Returns a high part of a float value that can be encoded to Float32 without precision loss
 * @param {number} float Number in float64 precision
 * @return {number} High part of the float value
 */
export function getHighPart(float: number): number;
/**
 * These arithmetic functions are mostly inspired the ones in luma.gl: https://github.com/visgl/luma.gl/blob/master/modules/shadertools/src/modules/math/fp64/fp64-arithmetic-glsl.ts
 * and https://blog.cyclemap.link/2011-06-09-glsl-part2-emu/
 * Note that we use the `u_one` uniform here to ensure that the compiler doesn't simplify the calculations; otherwise these will have no effect at all
 * @type {string}
 */
export const FLOAT64_ARITHMETIC_FN: string;
//# sourceMappingURL=float64Util.d.ts.map