import { Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, tn as KML, yn as StadiaMaps } from "./common.js";
//#region examples/kml-timezones.js
var styleFunction = function(feature) {
	const tzOffset = feature.get("tz-offset");
	const local = /* @__PURE__ */ new Date();
	local.setTime(local.getTime() + (local.getTimezoneOffset() + (tzOffset || 0)) * 6e4);
	let delta = Math.abs(12 - (local.getHours() + local.getMinutes() / 60));
	if (delta > 12) delta = 24 - delta;
	return new Style({
		fill: new Fill({ color: [
			255,
			255,
			51,
			.75 * (1 - delta / 12)
		] }),
		stroke: new Stroke({ color: "#ffffff" })
	});
};
var vector = new VectorLayer({
	source: new VectorSource({
		url: "data/kml/timezones.kml",
		format: new KML({ extractStyles: false })
	}),
	style: styleFunction
});
/**
* @param {string} name e.g. GMT -08:30
* @return {number|null} The offset from UTC in minutes
*/
function parseOffsetFromUtc(name) {
	const match = name.match(/([+-]?)(\d{2}):(\d{2})$/);
	if (!match) return null;
	const sign = match[1] === "-" ? -1 : 1;
	const hours = Number(match[2]);
	const minutes = Number(match[3]);
	return sign * (60 * hours + minutes);
}
vector.getSource().on("featuresloadend", function(evt) {
	evt.features.forEach(function(feature) {
		const tzOffset = parseOffsetFromUtc(feature.get("name"));
		feature.set("tz-offset", tzOffset, true);
	});
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

//# sourceMappingURL=kml-timezones.js.map