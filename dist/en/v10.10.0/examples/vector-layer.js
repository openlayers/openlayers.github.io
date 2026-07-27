import { Mn as Map, bn as VectorLayer, dn as VectorSource, or as View, rn as GeoJSON } from "./common.js";
//#region examples/vector-layer.js
var map = new Map({
	layers: [new VectorLayer({
		background: "#1a2b39",
		source: new VectorSource({
			url: "https://openlayers.org/data/vector/ecoregions.json",
			format: new GeoJSON()
		}),
		style: {
			"fill-color": [
				"string",
				["get", "COLOR"],
				"#eee"
			],
			"text-value": [
				"coalesce",
				["get", "ECO_NAME"],
				"unknown"
			],
			"text-font": "bold 12px \"Open Sans\", \"Arial Unicode MS\", sans-serif",
			"text-fill-color": "#333",
			"text-stroke-color": "rgba(255,255,255,0.8)",
			"text-stroke-width": 2,
			"text-overflow": true,
			"text-declutter-mode": "declutter"
		},
		declutter: true
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 1
	})
});
var featureOverlay = new VectorLayer({
	source: new VectorSource(),
	map,
	style: {
		"stroke-color": "rgba(255, 255, 255, 0.7)",
		"stroke-width": 2
	}
});
var highlight;
var displayFeatureInfo = function(pixel) {
	const feature = map.forEachFeatureAtPixel(pixel, function(feature) {
		return feature;
	});
	const info = document.getElementById("info");
	if (feature) info.innerHTML = feature.get("ECO_NAME") || "&nbsp;";
	else info.innerHTML = "&nbsp;";
	if (feature !== highlight) {
		if (highlight) featureOverlay.getSource().removeFeature(highlight);
		if (feature) featureOverlay.getSource().addFeature(feature);
		highlight = feature;
	}
};
map.on("pointermove", function(evt) {
	if (evt.dragging) return;
	displayFeatureInfo(evt.pixel);
});
map.on("click", function(evt) {
	displayFeatureInfo(evt.pixel);
});
//#endregion

//# sourceMappingURL=vector-layer.js.map