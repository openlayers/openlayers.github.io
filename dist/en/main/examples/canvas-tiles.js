import { Cn as OSM, Mn as Map, Qt as TileDebug, jn as TileLayer, or as View } from "./common.js";
//#region examples/canvas-tiles.js
new Map({
	layers: [new TileLayer({ source: new OSM() }), new TileLayer({ source: new TileDebug() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 1
	})
});
//#endregion

//# sourceMappingURL=canvas-tiles.js.map