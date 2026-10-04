import { Cn as OSM, Mn as Map, bn as VectorLayer, dn as VectorSource, jn as TileLayer, mr as fromExtent, or as View, xn as Feature } from "./common.js";
//#region examples/rectangle.js
new Map({
	layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source: new VectorSource({ features: [new Feature(fromExtent([
		-1e6,
		5e6,
		3e6,
		7e6
	]))] }) })],
	target: "map",
	view: new View({
		center: [1e6, 6e6],
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=rectangle.js.map