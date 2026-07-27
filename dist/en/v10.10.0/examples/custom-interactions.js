import { Dt as OGCMapTile, Jn as PointerInteraction, Mn as Map, Wn as defaults, bn as VectorLayer, dn as VectorSource, fr as Polygon, gn as LineString, hr as Point, jn as TileLayer, or as View, xn as Feature } from "./common.js";
//#region examples/custom-interactions.js
var Drag = class extends PointerInteraction {
	constructor() {
		super({
			handleDownEvent,
			handleDragEvent,
			handleMoveEvent,
			handleUpEvent
		});
		/**
		* @type {import('../src/ol/coordinate.js').Coordinate}
		* @private
		*/
		this.coordinate_ = null;
		/**
		* @type {string|undefined}
		* @private
		*/
		this.cursor_ = "pointer";
		/**
		* @type {Feature}
		* @private
		*/
		this.feature_ = null;
		/**
		* @type {string|undefined}
		* @private
		*/
		this.previousCursor_ = void 0;
	}
};
/**
* @param {import('../src/ol/MapBrowserEvent.js').default} evt Map browser event.
* @return {boolean} `true` to start the drag sequence.
*/
function handleDownEvent(evt) {
	const feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
		return feature;
	});
	if (feature) {
		this.coordinate_ = evt.coordinate;
		this.feature_ = feature;
	}
	return !!feature;
}
/**
* @param {import('../src/ol/MapBrowserEvent.js').default} evt Map browser event.
*/
function handleDragEvent(evt) {
	const deltaX = evt.coordinate[0] - this.coordinate_[0];
	const deltaY = evt.coordinate[1] - this.coordinate_[1];
	this.feature_.getGeometry().translate(deltaX, deltaY);
	this.coordinate_[0] = evt.coordinate[0];
	this.coordinate_[1] = evt.coordinate[1];
}
/**
* @param {import('../src/ol/MapBrowserEvent.js').default} evt Event.
*/
function handleMoveEvent(evt) {
	if (this.cursor_) {
		const feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
			return feature;
		});
		const element = evt.map.getTargetElement();
		if (feature) {
			if (element.style.cursor != this.cursor_) {
				this.previousCursor_ = element.style.cursor;
				element.style.cursor = this.cursor_;
			}
		} else if (this.previousCursor_ !== void 0) {
			element.style.cursor = this.previousCursor_;
			this.previousCursor_ = void 0;
		}
	}
}
/**
* @return {boolean} `false` to stop the drag sequence.
*/
function handleUpEvent() {
	this.coordinate_ = null;
	this.feature_ = null;
	return false;
}
var pointFeature = new Feature(new Point([0, 0]));
var lineFeature = new Feature(new LineString([[-1e7, 1e6], [-1e6, 3e6]]));
var polygonFeature = new Feature(new Polygon([[
	[-3e6, -1e6],
	[-3e6, 1e6],
	[-1e6, 1e6],
	[-1e6, -1e6],
	[-3e6, -1e6]
]]));
new Map({
	interactions: defaults().extend([new Drag()]),
	layers: [new TileLayer({ source: new OGCMapTile({
		url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad",
		crossOrigin: ""
	}) }), new VectorLayer({
		source: new VectorSource({ features: [
			pointFeature,
			lineFeature,
			polygonFeature
		] }),
		style: {
			"icon-src": "data/icon.png",
			"icon-opacity": .95,
			"icon-anchor": [.5, 46],
			"icon-anchor-x-units": "fraction",
			"icon-anchor-y-units": "pixels",
			"stroke-width": 3,
			"stroke-color": [
				255,
				0,
				0,
				1
			],
			"fill-color": [
				0,
				0,
				255,
				.6
			]
		}
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=custom-interactions.js.map