import { Cn as OSM, Mn as Map, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON } from "./common.js";
//#region examples/center.js
var source = new VectorSource({
	url: "data/geojson/switzerland.geojson",
	format: new GeoJSON()
});
var vectorLayer = new VectorLayer({
	source,
	style: {
		"fill-color": "rgba(255, 255, 255, 0.6)",
		"stroke-width": 1,
		"stroke-color": "#319FD3",
		"circle-radius": 5,
		"circle-fill-color": "rgba(255, 255, 255, 0.6)",
		"circle-stroke-width": 1,
		"circle-stroke-color": "#319FD3"
	}
});
var view = new View({
	center: [0, 0],
	zoom: 1
});
var map = new Map({
	layers: [new TileLayer({ source: new OSM() }), vectorLayer],
	target: "map",
	view
});
document.getElementById("zoomtoswitzerland").addEventListener("click", function() {
	const polygon = source.getFeatures()[0].getGeometry();
	view.fit(polygon, { padding: [
		170,
		50,
		30,
		150
	] });
}, false);
document.getElementById("zoomtolausanne").addEventListener("click", function() {
	const point = source.getFeatures()[1].getGeometry();
	view.fit(point, {
		padding: [
			170,
			50,
			30,
			150
		],
		minResolution: 50
	});
}, false);
document.getElementById("centerlausanne").addEventListener("click", function() {
	const point = source.getFeatures()[1].getGeometry();
	const size = map.getSize();
	view.centerOn(point.getCoordinates(), size, [570, 500]);
}, false);
//#endregion

//# sourceMappingURL=center.js.map