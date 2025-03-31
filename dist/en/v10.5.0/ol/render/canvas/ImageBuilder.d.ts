export default CanvasImageBuilder;
declare class CanvasImageBuilder extends CanvasBuilder {
    /**
     * @private
     * @type {import('../../DataTile.js').ImageLike}
     */
    private hitDetectionImage_;
    /**
     * @private
     * @type {import('../../DataTile.js').ImageLike}
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
     * @type {import('../../style/Style.js').DeclutterMode}
     */
    private declutterMode_;
    /**
     * Data shared with a text builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText}
     */
    private declutterImageWithText_;
    /**
     * @param {import("../../style/Image.js").default} imageStyle Image style.
     * @param {Object} [sharedData] Shared data.
     * @override
     */
    override setImageStyle(imageStyle: import("../../style/Image.js").default, sharedData?: any): void;
}
import CanvasBuilder from './Builder.js';
//# sourceMappingURL=ImageBuilder.d.ts.map