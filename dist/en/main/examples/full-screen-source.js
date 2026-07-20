import { Cn as OSM, L as FullScreen, Mn as Map, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/full-screen-source.js
var view = new View({
	center: [-9101767, 2822912],
	zoom: 14
});
new Map({
	controls: defaults().extend([new FullScreen({ source: "fullscreen" })]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view
});
//#endregion

//# sourceMappingURL=full-screen-source.js.map