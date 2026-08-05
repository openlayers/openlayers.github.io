export default CanvasImageLayerRenderer;
/**
 * @classdesc
 * Canvas renderer for image layers.
 * @api
 * @extends {CanvasLayerRenderer<import("../../layer/Image.js").default<import("../../source/Image.js").default>>}
 */
declare class CanvasImageLayerRenderer extends CanvasLayerRenderer<import("../../layer/Image.js").default<import("../../source/Image.js").default>> {
    /**
     * @param {import("../../layer/Image.js").default<import("../../source/Image.js").default>} imageLayer Image layer.
     */
    constructor(imageLayer: import("../../layer/Image.js").default<import("../../source/Image.js").default>);
    /**
     * @protected
     * @type {?import("../../Image.js").default}
     */
    protected image: import("../../Image.js").default | null;
    /**
     * @private
     * @type {number}
     */
    private renderedSourceRevision_;
    /**
     * @return {import('../../DataTile.js').ImageLike|null} Image.
     */
    getImage(): import("../../DataTile.js").ImageLike | null;
    /**
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray|null} Data at the pixel location.
     * @override
     */
    override getData(pixel: import("../../pixel.js").Pixel): Uint8ClampedArray | null;
    /**
     * Render the layer.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     * @override
     */
    override renderFrame(frameState: import("../../Map.js").FrameState, target: HTMLElement): HTMLElement;
}
import CanvasLayerRenderer from './Layer.js';
//# sourceMappingURL=ImageLayer.d.ts.map