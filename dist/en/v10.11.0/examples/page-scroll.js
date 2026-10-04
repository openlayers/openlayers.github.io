import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/page-scroll.js
new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=page-scroll.js.map