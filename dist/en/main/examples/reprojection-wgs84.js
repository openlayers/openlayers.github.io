import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/reprojection-wgs84.js
new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		projection: "EPSG:4326",
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=reprojection-wgs84.js.map