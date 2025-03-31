export default DblClickDragZoom;
export type Options = {
    /**
     * Animation duration in milliseconds. *
     */
    duration?: number | undefined;
    /**
     * The zoom delta applied on move of one pixel. *
     */
    delta?: number | undefined;
    /**
     * Should the down event be propagated to other interactions, or should be
     * stopped?
     */
    stopDown?: ((arg0: boolean) => boolean) | undefined;
};
/**
 * @typedef {Object} Options
 * @property {number} [duration=400] Animation duration in milliseconds. *
 * @property {number} [delta=1] The zoom delta applied on move of one pixel. *
 * @property {function(boolean):boolean} [stopDown]
 * Should the down event be propagated to other interactions, or should be
 * stopped?
 */
/**
 * @classdesc
 * Allows the user to zoom the map by double tap/click then drag up/down
 * with one finger/left mouse.
 * @api
 */
declare class DblClickDragZoom extends Interaction {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options);
    /**
     * This function is used to determine if "down" events should be propagated
     * to other interactions or should be stopped.
     * @param {boolean} handled Was the event handled by the interaction?
     * @return {boolean} Should the `down` event be stopped?
     */
    stopDown(handled: boolean): boolean;
    /**
     * @private
     * @type {number}
     */
    private scaleDeltaByPixel_;
    /**
     * @private
     * @type {number}
     */
    private duration_;
    /**
     * @type {boolean}
     * @private
     */
    private handlingDownUpSequence_;
    /**
     * @type {boolean}
     * @private
     */
    private handlingDoubleDownSequence_;
    /**
     * @type {ReturnType<typeof setTimeout>}
     * @private
     */
    private doubleTapTimeoutId_;
    /**
     * @type {!Object<string, PointerEvent>}
     * @private
     */
    private trackedPointers_;
    /**
     * @type {PointerEvent|null}
     * @private
     */
    private down_;
    /**
     * @type {Array<PointerEvent>}
     * @protected
     */
    protected targetPointers: Array<PointerEvent>;
    /**
     * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent  map browser event} and may call into
     * other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
     * detected.
     * @param {import("../MapBrowserEvent.js").default<PointerEvent>} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @api
     * @override
     */
    override handleEvent(mapBrowserEvent: import("../MapBrowserEvent.js").default<PointerEvent>): boolean;
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default<PointerEvent>} mapBrowserEvent Event.
     */
    handleDragEvent(mapBrowserEvent: import("../MapBrowserEvent.js").default<PointerEvent>): void;
    lastDistance_: number | undefined;
    lastScaleDelta_: number | undefined;
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default<PointerEvent>} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    handleDownEvent(mapBrowserEvent: import("../MapBrowserEvent.js").default<PointerEvent>): boolean;
    anchor_: any;
    /**
     * Handle pointer up events zooming out.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    handleUpEvent(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
    /**
     * @param {import("../MapBrowserEvent.js").default<PointerEvent>} mapBrowserEvent Event.
     * @private
     */
    private updateTrackedPointers_;
    /**
     * Wait the second double finger tap.
     * @private
     */
    private waitForDblTap_;
    /**
     * @private
     */
    private endInteraction_;
}
import Interaction from './Interaction.js';
//# sourceMappingURL=DblClickDragZoom.d.ts.map