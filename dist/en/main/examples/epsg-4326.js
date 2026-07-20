import { Ct as TileWMS, Mn as Map, U as ScaleLine, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/epsg-4326.js
var layers = [new TileLayer({ source: new TileWMS({
	url: "https://ahocevar.com/geoserver/wms",
	params: {
		"LAYERS": "ne:NE1_HR_LC_SR_W_DR",
		"TILED": true
	}
}) })];
new Map({
	controls: defaults().extend([new ScaleLine({ units: "degrees" })]),
	layers,
	target: "map",
	view: new View({
		projection: "EPSG:4326",
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=epsg-4326.js.map