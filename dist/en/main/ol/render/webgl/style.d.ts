/**
 * see https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * @param {Object|string} input The hash input, either an object or string
 * @return {string} Hash (if the object cannot be serialized, it is based on `getUid`)
 */
export function computeHash(input: any | string): string;
/**
 * @typedef {Object} StyleParseResult
 * @property {ShaderBuilder} builder Shader builder pre-configured according to a given style
 * @property {import("./VectorStyleRenderer.js").UniformDefinitions} uniforms Uniform definitions
 * @property {import("./VectorStyleRenderer.js").AttributeDefinitions} attributes Attribute definitions
 */
/**
 * Parses a {@link import("../../style/flat.js").FlatStyle} object and returns a {@link ShaderBuilder}
 * object that has been configured according to the given style, as well as `attributes` and `uniforms`
 * arrays to be fed to the `WebGLPointsRenderer` class.
 *
 * Also returns `uniforms` and `attributes` properties as expected by the
 * {@link module:ol/renderer/webgl/PointsLayer~WebGLPointsLayerRenderer}.
 *
 * @param {import("../../style/flat.js").FlatStyle} style Flat style.
 * @param {import('../../style/flat.js').StyleVariables} [variables] Style variables.
 * @param {import("../../expr/expression.js").EncodedExpression} [filter] Filter (if any)
 * @return {StyleParseResult} Result containing shader params, attributes and uniforms.
 */
export function parseLiteralStyle(style: import("../../style/flat.js").FlatStyle, variables?: import("../../style/flat.js").StyleVariables, filter?: import("../../expr/expression.js").EncodedExpression): StyleParseResult;
export type StyleParseResult = {
    /**
     * Shader builder pre-configured according to a given style
     */
    builder: ShaderBuilder;
    /**
     * Uniform definitions
     */
    uniforms: import("./VectorStyleRenderer.js").UniformDefinitions;
    /**
     * Attribute definitions
     */
    attributes: import("./VectorStyleRenderer.js").AttributeDefinitions;
};
import { ShaderBuilder } from './ShaderBuilder.js';
//# sourceMappingURL=style.d.ts.map