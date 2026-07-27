import { Cn as OSM, Mn as Map, jn as TileLayer, or as View, rr as defaults, z as ZoomSlider } from "./common.js";
//#region examples/extent-constrained.js
var view = new View({
	center: [328627.563458, 5921296.662223],
	zoom: 8,
	extent: [
		-572513.341856,
		5211017.966314,
		916327.095083,
		6636950.728974
	]
});
new Map({
	layers: [new TileLayer({ source: new OSM() })],
	keyboardEventTarget: document,
	target: "map",
	view,
	controls: defaults().extend([new ZoomSlider()])
});
//#endregion

//# sourceMappingURL=extent-constrained.js.map