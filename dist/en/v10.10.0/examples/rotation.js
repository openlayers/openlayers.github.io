import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/rotation.js
new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [142e5, 413e4],
		rotation: Math.PI / 6,
		zoom: 10
	})
});
//#endregion

//# sourceMappingURL=rotation.js.map