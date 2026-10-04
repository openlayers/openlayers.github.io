import { Cn as OSM, Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, Sn as ATTRIBUTION, X as IGC, bn as VectorLayer, ct as getVectorContext, dn as VectorSource, gn as LineString, hr as Point, jn as TileLayer, or as View, xn as Feature } from "./common.js";
//#region examples/igc.js
var colors = {
	"Clement Latour": "rgba(0, 0, 255, 0.7)",
	"Damien de Baesnt": "rgba(0, 215, 255, 0.7)",
	"Sylvain Dhonneur": "rgba(0, 165, 255, 0.7)",
	"Tom Payne": "rgba(0, 255, 255, 0.7)",
	"Ulrich Prinz": "rgba(0, 215, 255, 0.7)"
};
var styleCache = {};
var styleFunction = function(feature) {
	const color = colors[feature.get("PLT")];
	let style = styleCache[color];
	if (!style) {
		style = new Style({ stroke: new Stroke({
			color,
			width: 3
		}) });
		styleCache[color] = style;
	}
	return style;
};
var vectorSource = new VectorSource();
var igcUrls = [
	"data/igc/Clement-Latour.igc",
	"data/igc/Damien-de-Baenst.igc",
	"data/igc/Sylvain-Dhonneur.igc",
	"data/igc/Tom-Payne.igc",
	"data/igc/Ulrich-Prinz.igc"
];
function get(url, callback) {
	const client = new XMLHttpRequest();
	client.open("GET", url);
	client.onload = function() {
		callback(client.responseText);
	};
	client.send();
}
var igcFormat = new IGC();
for (let i = 0; i < igcUrls.length; ++i) get(igcUrls[i], function(data) {
	const features = igcFormat.readFeatures(data, { featureProjection: "EPSG:3857" });
	vectorSource.addFeatures(features);
});
var time = {
	start: Infinity,
	stop: -Infinity,
	duration: 0
};
vectorSource.on("addfeature", function(event) {
	const geometry = event.feature.getGeometry();
	time.start = Math.min(time.start, geometry.getFirstCoordinate()[2]);
	time.stop = Math.max(time.stop, geometry.getLastCoordinate()[2]);
	time.duration = time.stop - time.start;
});
var vectorLayer = new VectorLayer({
	source: vectorSource,
	style: styleFunction
});
var map = new Map({
	layers: [new TileLayer({ source: new OSM({
		attributions: ["All maps © <a href=\"https://www.opencyclemap.org/\">OpenCycleMap</a>", ATTRIBUTION],
		url: "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0e6fc415256d4fbb9b5166a718591d71"
	}) }), vectorLayer],
	target: "map",
	view: new View({
		center: [703365.7089403362, 5714629.865071137],
		zoom: 9
	})
});
var point = null;
var line = null;
var displaySnap = function(coordinate) {
	const closestFeature = vectorSource.getClosestFeatureToCoordinate(coordinate);
	const info = document.getElementById("info");
	if (closestFeature === null) {
		point = null;
		line = null;
		info.innerHTML = "&nbsp;";
	} else {
		const closestPoint = closestFeature.getGeometry().getClosestPoint(coordinate);
		if (point === null) point = new Point(closestPoint);
		else point.setCoordinates(closestPoint);
		const date = /* @__PURE__ */ new Date(closestPoint[2] * 1e3);
		info.innerHTML = closestFeature.get("PLT") + " (" + date.toUTCString() + ")";
		const coordinates = [coordinate, [closestPoint[0], closestPoint[1]]];
		if (line === null) line = new LineString(coordinates);
		else line.setCoordinates(coordinates);
	}
	map.render();
};
map.on("pointermove", function(evt) {
	if (evt.dragging) return;
	displaySnap(map.getEventCoordinate(evt.originalEvent));
});
map.on("click", function(evt) {
	displaySnap(evt.coordinate);
});
var stroke = new Stroke({
	color: "rgba(255,0,0,0.9)",
	width: 1
});
var style = new Style({
	stroke,
	image: new CircleStyle({
		radius: 5,
		fill: null,
		stroke
	})
});
vectorLayer.on("postrender", function(evt) {
	const vectorContext = getVectorContext(evt);
	vectorContext.setStyle(style);
	if (point !== null) vectorContext.drawGeometry(point);
	if (line !== null) vectorContext.drawGeometry(line);
});
var featureOverlay = new VectorLayer({
	source: new VectorSource(),
	map,
	style: new Style({ image: new CircleStyle({
		radius: 5,
		fill: new Fill({ color: "rgba(255,0,0,0.9)" })
	}) })
});
var control = document.getElementById("time");
control.addEventListener("input", function() {
	const value = parseInt(control.value, 10) / 100;
	const m = time.start + time.duration * value;
	vectorSource.forEachFeature(function(feature) {
		const coordinate = feature.getGeometry().getCoordinateAtM(m, true);
		let highlight = feature.get("highlight");
		if (highlight === void 0) {
			highlight = new Feature(new Point(coordinate));
			feature.set("highlight", highlight);
			featureOverlay.getSource().addFeature(highlight);
		} else highlight.getGeometry().setCoordinates(coordinate);
	});
	map.render();
});
//#endregion

//# sourceMappingURL=igc.js.map