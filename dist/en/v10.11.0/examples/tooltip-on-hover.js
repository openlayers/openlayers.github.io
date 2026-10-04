import { Mn as Map, bn as VectorLayer, dn as VectorSource, or as View, rn as GeoJSON } from "./common.js";
//#region examples/tooltip-on-hover.js
var map = new Map({
	layers: [new VectorLayer({
		source: new VectorSource({
			url: "https://openlayers.org/data/vector/ecoregions.json",
			format: new GeoJSON()
		}),
		background: "white",
		style: { "fill-color": [
			"string",
			["get", "COLOR"],
			"#eeeeee"
		] }
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var info = document.getElementById("info");
var currentFeature;
var displayFeatureInfo = function(pixel, target) {
	const feature = target.closest(".ol-control") ? void 0 : map.forEachFeatureAtPixel(pixel, function(feature) {
		return feature;
	});
	if (feature) {
		info.style.left = pixel[0] + "px";
		info.style.top = pixel[1] + "px";
		if (feature !== currentFeature) {
			info.style.visibility = "visible";
			info.innerText = feature.get("ECO_NAME");
		}
	} else info.style.visibility = "hidden";
	currentFeature = feature;
};
map.on("pointermove", function(evt) {
	if (evt.dragging) {
		info.style.visibility = "hidden";
		currentFeature = void 0;
		return;
	}
	displayFeatureInfo(evt.pixel, evt.originalEvent.target);
});
map.on("click", function(evt) {
	displayFeatureInfo(evt.pixel, evt.originalEvent.target);
});
map.getTargetElement().addEventListener("pointerleave", function() {
	currentFeature = void 0;
	info.style.visibility = "hidden";
});
//#endregion

//# sourceMappingURL=tooltip-on-hover.js.map