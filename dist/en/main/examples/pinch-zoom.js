import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/pinch-zoom.js
new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2,
		constrainResolution: true
	})
});
//#endregion

//# sourceMappingURL=pinch-zoom.js.map