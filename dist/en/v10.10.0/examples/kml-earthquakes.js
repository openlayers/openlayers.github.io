import { Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, tn as KML, yn as StadiaMaps } from "./common.js";
//#region examples/kml-earthquakes.js
var styleCache = {};
var styleFunction = function(feature) {
	const name = feature.get("name");
	const radius = 5 + 20 * (parseFloat(name.substr(2)) - 5);
	let style = styleCache[radius];
	if (!style) {
		style = new Style({ image: new CircleStyle({
			radius,
			fill: new Fill({ color: "rgba(255, 153, 0, 0.4)" }),
			stroke: new Stroke({
				color: "rgba(255, 204, 0, 0.2)",
				width: 1
			})
		}) });
		styleCache[radius] = style;
	}
	return style;
};
var vector = new VectorLayer({
	source: new VectorSource({
		url: "data/kml/2012_Earthquakes_Mag5.kml",
		format: new KML({ extractStyles: false })
	}),
	style: styleFunction
});
var map = new Map({
	layers: [new TileLayer({ source: new StadiaMaps({ layer: "stamen_toner" }) }), vector],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var info = document.getElementById("info");
info.style.pointerEvents = "none";
var tooltip = new bootstrap.Tooltip(info, {
	animation: false,
	customClass: "pe-none",
	offset: [0, 5],
	title: "-",
	trigger: "manual"
});
var currentFeature;
var displayFeatureInfo = function(pixel, target) {
	const feature = target.closest(".ol-control") ? void 0 : map.forEachFeatureAtPixel(pixel, function(feature) {
		return feature;
	});
	if (feature) {
		info.style.left = pixel[0] + "px";
		info.style.top = pixel[1] + "px";
		if (feature !== currentFeature) tooltip.setContent({ ".tooltip-inner": feature.get("name") });
		if (currentFeature) tooltip.update();
		else tooltip.show();
	} else tooltip.hide();
	currentFeature = feature;
};
map.on("pointermove", function(evt) {
	if (evt.dragging) {
		tooltip.hide();
		currentFeature = void 0;
		return;
	}
	displayFeatureInfo(evt.pixel, evt.originalEvent.target);
});
map.on("click", function(evt) {
	displayFeatureInfo(evt.pixel, evt.originalEvent.target);
});
map.getTargetElement().addEventListener("pointerleave", function() {
	tooltip.hide();
	currentFeature = void 0;
});
//#endregion

//# sourceMappingURL=kml-earthquakes.js.map