/**
 * A function that takes a {@link module:ol/Feature~Feature} and returns `true` if the feature may be
 * selected or `false` otherwise.
 * @typedef {function(import("../Feature.js").default, import("../layer/Layer.js").default<import("../source/Source").default>):boolean} FilterFunction
 */
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [addCondition] A function
 * that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * By default, this is {@link module:ol/events/condition.never}. Use this if you
 * want to use different events for add and remove instead of `toggle`.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. This is the event
 * for the selected features as a whole. By default, this is
 * {@link module:ol/events/condition.singleClick}. Clicking on a feature selects that
 * feature and removes any that were in the selection. Clicking outside any
 * feature removes all from the selection.
 * See `toggle`, `add`, `remove` options for adding/removing extra features to/
 * from the selection.
 * @property {Array<import("../layer/Layer.js").default>|function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} [layers]
 * A list of layers from which features should be selected. Alternatively, a
 * filter function can be provided. The function will be called for each layer
 * in the map and should return `true` for layers that you want to be
 * selectable. If the option is absent, all visible layers will be considered
 * selectable.
 * @property {import("../style/Style.js").StyleLike|null} [style]
 * Style for the selected features. By default the default edit style is used
 * (see {@link module:ol/style/Style~Style}). Set to `null` if this interaction should not apply
 * any style changes for selected features.
 * If set to a falsey value, the selected feature's style will not change.
 * @property {import("../events/condition.js").Condition} [removeCondition] A function
 * that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * By default, this is {@link module:ol/events/condition.never}. Use this if you
 * want to use different events for add and remove instead of `toggle`.
 * @property {import("../events/condition.js").Condition} [toggleCondition] A function
 * that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. This is in addition
 * to the `condition` event. By default,
 * {@link module:ol/events/condition.shiftKeyOnly}, i.e. pressing `shift` as
 * well as the `condition` event, adds that feature to the current selection if
 * it is not currently selected, and removes it if it is. See `add` and `remove`
 * if you want to use different events instead of a toggle.
 * @property {boolean} [multi=false] A boolean that determines if the default
 * behaviour should select only single features or all (overlapping) features at
 * the clicked map position. The default of `false` means single select.
 * @property {Collection<Feature>} [features]
 * Collection where the interaction will place selected features. Optional. If
 * not set the interaction will create a collection. In any case the collection
 * used by the interaction is returned by
 * {@link module:ol/interaction/Select~Select#getFeatures}.
 * @property {FilterFunction} [filter] A function
 * that takes a {@link module:ol/Feature~Feature} and a
 * {@link module:ol/layer/Layer~Layer} and returns `true` if the feature may be
 * selected or `false` otherwise.
 * @property {number} [hitTolerance=0] Hit-detection tolerance. Pixels inside
 * the radius around the given position will be checked for features.
 */
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Select~Select} instances are instances of
 * this type.
 */
export class SelectEvent extends Event {
    /**
     * @param {SelectEventType} type The event type.
     * @param {Array<import("../Feature.js").default>} selected Selected features.
     * @param {Array<import("../Feature.js").default>} deselected Deselected features.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Associated
     *     {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     */
    constructor(type: SelectEventType, selected: Array<import("../Feature.js").default>, deselected: Array<import("../Feature.js").default>, mapBrowserEvent: import("../MapBrowserEvent.js").default);
    /**
     * Selected features array.
     * @type {Array<import("../Feature.js").default>}
     * @api
     */
    selected: Array<import("../Feature.js").default>;
    /**
     * Deselected features array.
     * @type {Array<import("../Feature.js").default>}
     * @api
     */
    deselected: Array<import("../Feature.js").default>;
    /**
     * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */
    mapBrowserEvent: import("../MapBrowserEvent.js").default;
}
export default Select;
/**
 * A function that takes a {@link module :ol/Feature~Feature} and returns `true` if the feature may be
 * selected or `false` otherwise.
 */
export type FilterFunction = (arg0: import("../Feature.js").default, arg1: import("../layer/Layer.js").default<import("../source/Source").default>) => boolean;
export type Options = {
    /**
     * A function
     * that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * By default, this is {@link module :ol/events/condition.never}. Use this if you
     * want to use different events for add and remove instead of `toggle`.
     */
    addCondition?: import("../events/condition.js").Condition | undefined;
    /**
     * A function that
     * takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. This is the event
     * for the selected features as a whole. By default, this is
     * {@link module :ol/events/condition.singleClick}. Clicking on a feature selects that
     * feature and removes any that were in the selection. Clicking outside any
     * feature removes all from the selection.
     * See `toggle`, `add`, `remove` options for adding/removing extra features to/
     * from the selection.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * A list of layers from which features should be selected. Alternatively, a
     * filter function can be provided. The function will be called for each layer
     * in the map and should return `true` for layers that you want to be
     * selectable. If the option is absent, all visible layers will be considered
     * selectable.
     */
    layers?: import("../layer/Layer.js").default<import("../source/Source").default, import("../renderer/Layer.js").default<any>>[] | ((arg0: import("../layer/Layer.js").default<import("../source/Source").default>) => boolean) | undefined;
    /**
     * Style for the selected features. By default the default edit style is used
     * (see {@link module :ol/style/Style~Style}). Set to `null` if this interaction should not apply
     * any style changes for selected features.
     * If set to a falsey value, the selected feature's style will not change.
     */
    style?: import("../style/Style.js").StyleLike | null | undefined;
    /**
     * A function
     * that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * By default, this is {@link module :ol/events/condition.never}. Use this if you
     * want to use different events for add and remove instead of `toggle`.
     */
    removeCondition?: import("../events/condition.js").Condition | undefined;
    /**
     * A function
     * that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. This is in addition
     * to the `condition` event. By default,
     * {@link module :ol/events/condition.shiftKeyOnly}, i.e. pressing `shift` as
     * well as the `condition` event, adds that feature to the current selection if
     * it is not currently selected, and removes it if it is. See `add` and `remove`
     * if you want to use different events instead of a toggle.
     */
    toggleCondition?: import("../events/condition.js").Condition | undefined;
    /**
     * A boolean that determines if the default
     * behaviour should select only single features or all (overlapping) features at
     * the clicked map position. The default of `false` means single select.
     */
    multi?: boolean | undefined;
    /**
     * Collection where the interaction will place selected features. Optional. If
     * not set the interaction will create a collection. In any case the collection
     * used by the interaction is returned by
     * {@link module :ol/interaction/Select~Select#getFeatures}.
     */
    features?: Collection<Feature<import("../geom.js").Geometry>> | undefined;
    /**
     * A function
     * that takes a {@link module :ol/Feature~Feature} and a
     * {@link module :ol/layer/Layer~Layer} and returns `true` if the feature may be
     * selected or `false` otherwise.
     */
    filter?: FilterFunction | undefined;
    /**
     * Hit-detection tolerance. Pixels inside
     * the radius around the given position will be checked for features.
     */
    hitTolerance?: number | undefined;
};
/**
 * *
 */
export type SelectOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | "change:active", import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<"select", SelectEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | "change:active" | "select", Return>;
import Event from '../events/Event.js';
type SelectEventType = string;
declare namespace SelectEventType {
    let SELECT: string;
}
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'select', SelectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'select', Return>} SelectOnSignature
 */
/**
 * @classdesc
 * Interaction for selecting vector features. By default, selected features are
 * styled differently, so this interaction can be used for visual highlighting,
 * as well as selecting features for other actions, such as modification or
 * output. There are three ways of controlling which features are selected:
 * using the browser event as defined by the `condition` and optionally the
 * `toggle`, `add`/`remove`, and `multi` options; a `layers` filter; and a
 * further feature filter using the `filter` option.
 *
 * @fires SelectEvent
 * @api
 */
declare class Select extends Interaction {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options);
    /***
     * @type {SelectOnSignature<import("../events").EventsKey>}
     */
    on: SelectOnSignature<import("../events").EventsKey>;
    /***
     * @type {SelectOnSignature<import("../events").EventsKey>}
     */
    once: SelectOnSignature<import("../events").EventsKey>;
    /***
     * @type {SelectOnSignature<void>}
     */
    un: SelectOnSignature<void>;
    /**
     * @private
     */
    private boundAddFeature_;
    /**
     * @private
     */
    private boundRemoveFeature_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private addCondition_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private removeCondition_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private toggleCondition_;
    /**
     * @private
     * @type {boolean}
     */
    private multi_;
    /**
     * @private
     * @type {FilterFunction}
     */
    private filter_;
    /**
     * @private
     * @type {number}
     */
    private hitTolerance_;
    /**
     * @private
     * @type {import("../style/Style.js").default|Array<import("../style/Style.js").default>|import("../style/Style.js").StyleFunction|null}
     */
    private style_;
    /**
     * @private
     * @type {Collection<Feature>}
     */
    private features_;
    /**
     * @private
     * @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean}
     */
    private layerFilter_;
    /**
     * An association between selected feature (key)
     * and layer (value)
     * @private
     * @type {Object<string, import("../layer/Layer.js").default>}
     */
    private featureLayerAssociation_;
    /**
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("../layer/Layer.js").default} layer Layer.
     * @private
     */
    private addFeatureLayerAssociation_;
    /**
     * Get the selected features.
     * @return {Collection<Feature>} Features collection.
     * @api
     */
    getFeatures(): Collection<Feature>;
    /**
     * Returns the Hit-detection tolerance.
     * @return {number} Hit tolerance in pixels.
     * @api
     */
    getHitTolerance(): number;
    /**
     * Returns the associated {@link module:ol/layer/Vector~VectorLayer vector layer} of
     * a selected feature.
     * @param {import("../Feature.js").default} feature Feature
     * @return {import('../layer/Vector.js').default} Layer.
     * @api
     */
    getLayer(feature: import("../Feature.js").default): import("../layer/Vector.js").default;
    /**
     * Hit-detection tolerance. Pixels inside the radius around the given position
     * will be checked for features.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @api
     */
    setHitTolerance(hitTolerance: number): void;
    /**
     * @param {import("../Collection.js").CollectionEvent<Feature>} evt Event.
     * @private
     */
    private addFeature_;
    /**
     * @param {import("../Collection.js").CollectionEvent<Feature>} evt Event.
     * @private
     */
    private removeFeature_;
    /**
     * @param {Feature} feature Feature of which to get the layer
     * @return {VectorLayer} layer, if one was found.
     * @private
     */
    private findLayerOfFeature_;
    /**
     * @return {import("../style/Style.js").StyleLike|null} Select style.
     */
    getStyle(): import("../style/Style.js").StyleLike | null;
    /**
     * @param {Feature} feature Feature
     * @private
     */
    private applySelectedStyle_;
    /**
     * @param {Feature} feature Feature
     * @private
     */
    private restorePreviousStyle_;
    /**
     * @param {Feature} feature Feature.
     * @private
     */
    private removeFeatureLayerAssociation_;
    /**
     * @param {import("../Feature.js").FeatureLike} feature The feature to select
     * @param {import("../layer/Layer.js").default} layer Optional layer containing this feature
     * @param {Array<Feature>} [selected] optional array to which selected features will be added
     * @return {Feature|undefined} The feature, if it got selected.
     * @private
     */
    private selectFeatureInternal_;
    /**
     * Try to select a feature as if it was clicked and `addCondition` evaluated to True.
     * Unlike modifying `select.getFeatures()` directly, this respects the `filter` and `layers` options (except `multi`, which is ignored).
     * The {@link module:ol/interaction/Select~SelectEvent} fired by this won't have a mapBrowserEvent property
     * @param {Feature} feature The feature to select
     * @return {boolean} True if the feature was selected
     */
    selectFeature(feature: Feature): boolean;
    /**
     * Deselects a feature if it was previously selected. Also removes layer association.
     * @param {import("../Feature.js").FeatureLike} feature The feature to deselect
     * @param {Array<Feature>} [deselected] optional array to which deselected features will be added
     * @return {Feature|undefined} The feature, if it was previously selected.
     * @private
     */
    private removeFeatureInternal_;
    /**
     * Try to deselect a feature as if it was clicked.
     * Compared to `select.getFeatures().remove(feature)` this causes a SelectEvent.
     * The {@link module:ol/interaction/Select~SelectEvent} fired by this won't have a mapBrowserEvent property
     * @param {Feature} feature The feature to deselect
     * @return {boolean} True if the feature was deselected
     */
    deselectFeature(feature: Feature): boolean;
    /**
     * Try to toggle a feature as if it was clicked and `toggleCondition` was True.
     * Unlike modifying `select.getFeatures()` directly, this respects the `filter` and `layers` options (except `multi`, which is ignored).
     * The {@link module:ol/interaction/Select~SelectEvent} fired by this won't have a mapBrowserEvent property
     * @param {Feature} feature The feature to deselect
     */
    toggleFeature(feature: Feature): void;
    /**
     * Deselect all features as if a user deselected them.
     * Compared to `select.getFeatures().clear()` this causes a SelectEvent.
     * The {@link module:ol/interaction/Select~SelectEvent} fired by this won't have a mapBrowserEvent property
     */
    clearSelection(): void;
}
import Feature from '../Feature.js';
import Collection from '../Collection.js';
import Interaction from './Interaction.js';
//# sourceMappingURL=Select.d.ts.map