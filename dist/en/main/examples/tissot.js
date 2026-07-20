import { Ct as TileWMS, Mn as Map, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, pr as circular, xn as Feature } from "./common.js";
//#region examples/tissot.js
var vectorLayer4326 = new VectorLayer({ source: new VectorSource() });
var vectorLayer3857 = new VectorLayer({ source: new VectorSource() });
new Map({
	layers: [new TileLayer({ source: new TileWMS({
		url: "https://ahocevar.com/geoserver/wms",
		params: {
			"LAYERS": "ne:NE1_HR_LC_SR_W_DR",
			"TILED": true
		}
	}) }), vectorLayer4326],
	target: "map4326",
	view: new View({
		projection: "EPSG:4326",
		center: [0, 0],
		zoom: 2
	})
});
new Map({
	layers: [new TileLayer({ source: new TileWMS({
		url: "https://ahocevar.com/geoserver/wms",
		params: {
			"LAYERS": "ne:NE1_HR_LC_SR_W_DR",
			"TILED": true
		}
	}) }), vectorLayer3857],
	target: "map3857",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var radius = 8e5;
var x;
var y;
for (x = -180; x < 180; x += 30) for (y = -90; y <= 90; y += 30) {
	const circle4326 = circular([x, y], radius, 64);
	const circle3857 = circle4326.clone().transform("EPSG:4326", "EPSG:3857");
	vectorLayer4326.getSource().addFeature(new Feature(circle4326));
	vectorLayer3857.getSource().addFeature(new Feature(circle3857));
}
//#endregion

//# sourceMappingURL=tissot.js.map