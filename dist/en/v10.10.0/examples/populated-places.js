import { M as Link, Mn as Map, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON, wn as XYZ } from "./common.js";
//#region examples/populated-places.js
var populatedPlaces = new VectorLayer({
	source: new VectorSource({
		url: "https://openlayers.org/data/vector/populated-places.json",
		format: new GeoJSON()
	}),
	style: {
		"circle-stroke-color": "hsl(0 100% 100% / 0.9)",
		"circle-stroke-width": .75,
		"circle-radius": [
			"interpolate",
			["linear"],
			["get", "pop_max"],
			5e5,
			3,
			1e7,
			10
		],
		"circle-fill-color": [
			"interpolate",
			["linear"],
			["get", "pop_max"],
			1e6,
			"hsl(210 100% 40% / 0.9)",
			1e7,
			"hsl(0 80% 60% / 0.9)"
		]
	}
});
var map = new Map({
	layers: [new TileLayer({ source: new XYZ({
		attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
		url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
		tileSize: 512,
		maxZoom: 20
	}) }), populatedPlaces],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 1
	})
});
map.addInteraction(new Link());
var info = document.getElementById("info");
var currentFeature = null;
function displayFeatureInfo(pixel, width) {
	const feature = map.getFeaturesAtPixel(pixel)[0];
	if (feature) {
		const featurePixel = map.getPixelFromCoordinate(feature.getGeometry().getCoordinates());
		if (featurePixel[0] > width) featurePixel[0] = featurePixel[0] % width;
		else if (featurePixel[1] < width) featurePixel[0] = width + featurePixel[0] % width;
		info.style.top = featurePixel[1] + "px";
		if (featurePixel[0] < width / 2) {
			info.style.left = featurePixel[0] + "px";
			info.style.right = "auto";
		} else {
			info.style.right = width - featurePixel[0] + "px";
			info.style.left = "auto";
		}
		if (feature !== currentFeature) {
			info.style.visibility = "visible";
			info.innerHTML = feature.get("name") + "<br>" + feature.get("pop_max").toLocaleString();
		}
	} else if (currentFeature) info.style.visibility = "hidden";
	currentFeature = feature;
}
map.on("pointermove", function(evt) {
	if (evt.dragging) {
		info.style.visibility = "hidden";
		currentFeature = void 0;
		return;
	}
	displayFeatureInfo(evt.pixel, evt.frameState.size[0]);
});
map.on("click", function(evt) {
	displayFeatureInfo(evt.pixel, evt.frameState.size[0]);
});
map.getTargetElement().addEventListener("pointerleave", function() {
	currentFeature = void 0;
	info.style.visibility = "hidden";
});
//#endregion

//# sourceMappingURL=populated-places.js.map