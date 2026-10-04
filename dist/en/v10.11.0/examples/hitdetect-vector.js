import { Mn as Map, bn as VectorLayer, dn as VectorSource, or as View, rn as GeoJSON } from "./common.js";
//#region examples/hitdetect-vector.js
var vectorLayer = new VectorLayer({
	background: "#1a2b39",
	source: new VectorSource({
		url: "https://openlayers.org/data/vector/ecoregions.json",
		format: new GeoJSON()
	}),
	style: { "fill-color": [
		"string",
		["get", "COLOR_NNH"],
		"#eee"
	] }
});
var map = new Map({
	layers: [vectorLayer],
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
	vectorLayer.getFeatures(pixel).then(function(features) {
		const feature = features.length ? features[0] : void 0;
		const info = document.getElementById("info");
		if (features.length) info.innerHTML = feature.get("ECO_NAME") + ": " + feature.get("NNH_NAME");
		else info.innerHTML = "&nbsp;";
		if (feature !== highlight) {
			if (highlight) featureOverlay.getSource().removeFeature(highlight);
			if (feature) featureOverlay.getSource().addFeature(feature);
			highlight = feature;
		}
	});
};
map.on("pointermove", function(evt) {
	if (evt.dragging) return;
	displayFeatureInfo(evt.pixel);
});
map.on("click", function(evt) {
	displayFeatureInfo(evt.pixel);
});
//#endregion

//# sourceMappingURL=hitdetect-vector.js.map