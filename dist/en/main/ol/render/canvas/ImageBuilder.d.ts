export default CanvasImageBuilder;
declare class CanvasImageBuilder extends CanvasBuilder {
    /**
     * @private
     * @type {import('../../DataTile.js').ImageLike|null}
     */
    private hitDetectionImage_;
    /**
     * @private
     * @type {import('../../DataTile.js').ImageLike|null}
     */
    private image_;
    /**
     * @private
     * @type {number|undefined}
     */
    private imagePixelRatio_;
    /**
     * @private
     * @type {number|undefined}
     */
    private anchorX_;
    /**
     * @private
     * @type {number|undefined}
     */
    private anchorY_;
    /**
     * @private
     * @type {number|undefined}
     */
    private height_;
    /**
     * @private
     * @type {number|undefined}
     */
    private opacity_;
    /**
     * @private
     * @type {number|undefined}
     */
    private originX_;
    /**
     * @private
     * @type {number|undefined}
     */
    private originY_;
    /**
     * @private
     * @type {boolean|undefined}
     */
    private rotateWithView_;
    /**
     * @private
     * @type {number|undefined}
     */
    private rotation_;
    /**
     * @private
     * @type {import("../../size.js").Size|undefined}
     */
    private scale_;
    /**
     * @private
     * @type {number|undefined}
     */
    private width_;
    /**
     * @private
     * @type {number|undefined}
     */
    private repeat_;
    /**
     * @private
     * @type {import('../../style/Style.js').DeclutterMode|undefined}
     */
    private declutterMode_;
    /**
     * Data shared with a text builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText|undefined}
     */
    private declutterImageWithText_;
    /**
     * @param {import("../../geom/MultiPolygon.js").default|import("../Feature.js").default} multiPolygonGeometry MultiPolygon geometry.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {number} [index] Render order index.
     * @override
     */
    override drawMultiPolygon(multiPolygonGeometry: import("../../geom/MultiPolygon.js").default | import("../Feature.js").default, feature: import("../../Feature.js").FeatureLike, index?: number): void;
    /**
     * Compute evenly-spaced anchors (or a single anchor when `repeat_` is not set) along
     * a sub-line, and draw one image per anchor. When `rotateWithView_` is `true` (the
     * default), each image is rotated to follow its own interval's start/end tangent;
     * otherwise every image just keeps the image style's own fixed rotation.
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @private
     */
    private drawAnchoredImages_;
    /**
     * Push one `DRAW_IMAGE` instruction for a single anchor coordinate, using the
     * provided rotation instead of the image style's own fixed rotation.
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate to draw the image at.
     * @param {number|undefined} rotation Rotation (radians).
     * @private
     */
    private drawImageAtCoordinate_;
    /**
     * Append one `DRAW_IMAGE` instruction (and its hit-detection counterpart) covering the
     * coordinates in `this.coordinates` between `myBegin` and `myEnd`.
     * @param {number} myBegin Begin index into `this.coordinates`.
     * @param {number} myEnd End index into `this.coordinates`.
     * @param {number|undefined} rotation Rotation (radians).
     * @private
     */
    private appendImageInstruction_;
    /**
     * @param {import("../../style/Image.js").default} imageStyle Image style.
     * @param {Object} [sharedData] Shared data.
     * @override
     */
    override setImageStyle(imageStyle: import("../../style/Image.js").default, sharedData?: any): void;
}
import CanvasBuilder from './Builder.js';
//# sourceMappingURL=ImageBuilder.d.ts.map