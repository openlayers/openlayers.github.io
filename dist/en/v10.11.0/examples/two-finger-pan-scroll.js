import { $n as platformModifierKeyOnly, Cn as OSM, Gn as MouseWheelZoom, Mn as Map, Wn as defaults, jn as TileLayer, or as View, qn as DragPan } from "./common.js";
//#region examples/two-finger-pan-scroll.js
new Map({
	interactions: defaults({
		dragPan: false,
		mouseWheelZoom: false
	}).extend([new DragPan({ condition: function(event) {
		return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
	} }), new MouseWheelZoom({ condition: platformModifierKeyOnly })]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=two-finger-pan-scroll.js.map