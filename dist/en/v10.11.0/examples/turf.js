import { Cn as OSM, Cr as fromLonLat, Mn as Map, a as length, bn as VectorLayer, dn as VectorSource, jn as TileLayer, o as along, or as View, rn as GeoJSON } from "./common.js";
//#region examples/turf.js
var source = new VectorSource();
fetch("data/geojson/roads-seoul.geojson").then(function(response) {
	return response.json();
}).then(function(json) {
	const format = new GeoJSON();
	const street = format.readFeatures(json)[0];
	const turfLine = format.writeFeatureObject(street);
	const distance = .2;
	const lineLength = length(turfLine, { units: "kilometers" });
	for (let i = 1; i <= lineLength / distance; i++) {
		const turfPoint = along(turfLine, i * distance, { units: "kilometers" });
		const marker = format.readFeature(turfPoint);
		marker.getGeometry().transform("EPSG:4326", "EPSG:3857");
		source.addFeature(marker);
	}
	street.getGeometry().transform("EPSG:4326", "EPSG:3857");
	source.addFeature(street);
});
var vectorLayer = new VectorLayer({ source });
new Map({
	layers: [new TileLayer({ source: new OSM() }), vectorLayer],
	target: document.getElementById("map"),
	view: new View({
		center: fromLonLat([126.980366, 37.52654]),
		zoom: 15
	})
});
//#endregion

//# sourceMappingURL=turf.js.map