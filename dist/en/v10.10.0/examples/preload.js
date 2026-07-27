import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/preload.js
var view = new View({
	center: [-4808600, -2620936],
	zoom: 8
});
new Map({
	layers: [new TileLayer({
		preload: Infinity,
		source: new OSM({})
	})],
	target: "map1",
	view
});
new Map({
	layers: [new TileLayer({
		preload: 0,
		source: new OSM({})
	})],
	target: "map2",
	view
});
//#endregion

//# sourceMappingURL=preload.js.map