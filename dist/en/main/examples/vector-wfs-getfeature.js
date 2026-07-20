import { Fn as Stroke, Mn as Map, Pn as Style, an as ImageTileSource, bn as VectorLayer, d as and, dn as VectorSource, f as equalTo, jn as TileLayer, or as View, p as like, rn as GeoJSON, u as WFS } from "./common.js";
//#region examples/vector-wfs-getfeature.js
var vectorSource = new VectorSource();
var vector = new VectorLayer({
	source: vectorSource,
	style: new Style({ stroke: new Stroke({
		color: "rgba(0, 0, 255, 1.0)",
		width: 2
	}) })
});
var map = new Map({
	layers: [new TileLayer({ source: new ImageTileSource({
		attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
		url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
		tileSize: 512,
		maxZoom: 20
	}) }), vector],
	target: document.getElementById("map"),
	view: new View({
		center: [-8908887.277395891, 5381918.072437216],
		maxZoom: 19,
		zoom: 12
	})
});
var featureRequest = new WFS().writeGetFeature({
	srsName: "EPSG:3857",
	featureNS: "http://openstreemap.org",
	featurePrefix: "osm",
	featureTypes: ["water_areas"],
	outputFormat: "application/json",
	filter: and(like("name", "Mississippi*"), equalTo("waterway", "riverbank"))
});
fetch("https://ahocevar.com/geoserver/wfs", {
	method: "POST",
	body: new XMLSerializer().serializeToString(featureRequest)
}).then(function(response) {
	return response.json();
}).then(function(json) {
	const features = new GeoJSON().readFeatures(json);
	vectorSource.addFeatures(features);
	map.getView().fit(vectorSource.getExtent());
});
//#endregion

//# sourceMappingURL=vector-wfs-getfeature.js.map