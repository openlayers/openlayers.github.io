/**
 * Will return the number as a float with a dot separator, which is required by GLSL.
 * @param {number} v Numerical value.
 * @return {string} The value as string.
 */
export function numberToGlsl(v: number): string;
/**
 * Will return the number array as a float with a dot separator, concatenated with ', '.
 * @param {Array<number>} array Numerical values array.
 * @return {string} The array as a vector, e. g.: `vec3(1.0, 2.0, 3.0)`.
 */
export function arrayToGlsl(array: Array<number>): string;
/**
 * Will normalize and converts to string a `vec4` color array compatible with GLSL.
 * @param {string|import("../color.js").Color} color Color either in string format or [r, g, b, a] array format,
 * with RGB components in the 0..255 range and the alpha component in the 0..1 range.
 * Note that the final array will always have 4 components.
 * @return {string} The color expressed in the `vec4(1.0, 1.0, 1.0, 1.0)` form.
 */
export function colorToGlsl(color: string | import("../color.js").Color): string;
/**
 * Normalizes and converts a number or array toa `vec2` array compatible with GLSL.
 * @param {number|import('../size.js').Size} size Size.
 * @return {string} The color expressed in the `vec4(1.0, 1.0, 1.0, 1.0)` form.
 */
export function sizeToGlsl(size: number | import("../size.js").Size): string;
/**
 * Returns a stable equivalent number for the string literal.
 * @param {string} string String literal value
 * @return {number} Number equivalent
 */
export function getStringNumberEquivalent(string: string): number;
/**
 * Returns a stable equivalent number for the string literal, for use in shaders. This number is then
 * converted to be a GLSL-compatible string.
 * Note: with a float precision of `mediump`, the amount of unique strings supported is 16,777,216
 * @param {string} string String literal value
 * @return {string} GLSL-compatible string containing a number
 */
export function stringToGlsl(string: string): string;
/**
 * Get the uniform name given a variable name.
 * @param {string} variableName The variable name.
 * @return {string} The uniform name.
 */
export function uniformNameForVariable(variableName: string): string;
/**
 * @typedef {import('./expression.js').ParsingContext} ParsingContext
 */
/**
 *
 * @typedef {import("./expression.js").Expression} Expression
 */
/**
 *
 * @typedef {import("./expression.js").LiteralExpression} LiteralExpression
 */
/**
 * @typedef {Object} CompilationContextProperty
 * @property {string} name Name
 * @property {number} type Resolved property type
 */
/**
 * @typedef {Object} CompilationContextVariable
 * @property {string} name Name
 * @property {number} type Resolved variable type
 */
/**
 * @typedef {Object} CompilationContext
 * @property {Object<string, CompilationContextProperty>} properties The values for properties used in 'get' expressions.
 * @property {Object<string, CompilationContextVariable>} variables The values for variables used in 'var' expressions.
 * @property {Object<string, string>} functions Lookup of functions used by the style.
 * @property {number} [bandCount] Number of bands per pixel.
 * @property {Array<PaletteTexture>} [paletteTextures] List of palettes used by the style.
 * @property {boolean} featureId Whether the feature ID is used in the expression
 * @property {boolean} geometryType Whether the geometry type is used in the expression
 */
/**
 * @return {CompilationContext} A new compilation context.
 */
export function newCompilationContext(): CompilationContext;
/**
 * @typedef {string} CompiledExpression
 */
/**
 * @typedef {function(CompilationContext, CallExpression, number): string} Compiler
 * Third argument is the expected value types
 */
/**
 * @param {import('./expression.js').EncodedExpression} encoded The encoded expression.
 * @param {number} type The expected type.
 * @param {import('./expression.js').ParsingContext} parsingContext The parsing context.
 * @param {CompilationContext} compilationContext An existing compilation context
 * @return {CompiledExpression} The compiled expression.
 */
export function buildExpression(encoded: import("./expression.js").EncodedExpression, type: number, parsingContext: import("./expression.js").ParsingContext, compilationContext: CompilationContext): CompiledExpression;
export const PALETTE_TEXTURE_ARRAY: "u_paletteTextures";
export const FEATURE_ID_PROPERTY_NAME: "featureId";
export const GEOMETRY_TYPE_PROPERTY_NAME: "geometryType";
/**
 * The value `-9999999` will be used to indicate that a property on a feature is not defined, similar to a "no data" value.
 */
export const UNDEFINED_PROP_VALUE: -9999999;
export type ParsingContext = import("./expression.js").ParsingContext;
export type Expression = import("./expression.js").Expression;
export type LiteralExpression = import("./expression.js").LiteralExpression;
export type CompilationContextProperty = {
    /**
     * Name
     */
    name: string;
    /**
     * Resolved property type
     */
    type: number;
};
export type CompilationContextVariable = {
    /**
     * Name
     */
    name: string;
    /**
     * Resolved variable type
     */
    type: number;
};
export type CompilationContext = {
    /**
     * The values for properties used in 'get' expressions.
     */
    properties: {
        [x: string]: CompilationContextProperty;
    };
    /**
     * The values for variables used in 'var' expressions.
     */
    variables: {
        [x: string]: CompilationContextVariable;
    };
    /**
     * Lookup of functions used by the style.
     */
    functions: {
        [x: string]: string;
    };
    /**
     * Number of bands per pixel.
     */
    bandCount?: number | undefined;
    /**
     * List of palettes used by the style.
     */
    paletteTextures?: PaletteTexture[] | undefined;
    /**
     * Whether the feature ID is used in the expression
     */
    featureId: boolean;
    /**
     * Whether the geometry type is used in the expression
     */
    geometryType: boolean;
};
export type CompiledExpression = string;
/**
 * Third argument is the expected value types
 */
export type Compiler = (arg0: CompilationContext, arg1: CallExpression, arg2: number) => string;
import PaletteTexture from '../webgl/PaletteTexture.js';
import { CallExpression } from './expression.js';
//# sourceMappingURL=gpu.d.ts.map