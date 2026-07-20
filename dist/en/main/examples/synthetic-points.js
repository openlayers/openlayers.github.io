import { Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, bn as VectorLayer, ct as getVectorContext, dn as VectorSource, gn as LineString, hr as Point, or as View, xn as Feature } from "./common.js";
//#region examples/synthetic-points.js
var count = 2e4;
var features = new Array(count);
var e = 18e6;
for (let i = 0; i < count; ++i) features[i] = new Feature({
	"geometry": new Point([2 * e * Math.random() - e, 2 * e * Math.random() - e]),
	"i": i,
	"size": i % 2 ? 10 : 20
});
var styles = {
	"10": new Style({ image: new CircleStyle({
		radius: 5,
		fill: new Fill({ color: "#666666" }),
		stroke: new Stroke({
			color: "#bada55",
			width: 1
		})
	}) }),
	"20": new Style({ image: new CircleStyle({
		radius: 10,
		fill: new Fill({ color: "#666666" }),
		stroke: new Stroke({
			color: "#bada55",
			width: 1
		})
	}) })
};
var vectorSource = new VectorSource({
	features,
	wrapX: false
});
var vector = new VectorLayer({
	source: vectorSource,
	style: function(feature) {
		return styles[feature.get("size")];
	}
});
var map = new Map({
	layers: [vector],
	target: document.getElementById("map"),
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var point = null;
var line = null;
var displaySnap = function(coordinate) {
	const closestFeature = vectorSource.getClosestFeatureToCoordinate(coordinate);
	if (closestFeature === null) {
		point = null;
		line = null;
	} else {
		const closestPoint = closestFeature.getGeometry().getClosestPoint(coordinate);
		if (point === null) point = new Point(closestPoint);
		else point.setCoordinates(closestPoint);
		if (line === null) line = new LineString([coordinate, closestPoint]);
		else line.setCoordinates([coordinate, closestPoint]);
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
	color: "rgba(255,255,0,0.9)",
	width: 3
});
var style = new Style({
	stroke,
	image: new CircleStyle({
		radius: 10,
		stroke
	})
});
vector.on("postrender", function(evt) {
	const vectorContext = getVectorContext(evt);
	vectorContext.setStyle(style);
	if (point !== null) vectorContext.drawGeometry(point);
	if (line !== null) vectorContext.drawGeometry(line);
});
map.on("pointermove", function(evt) {
	if (evt.dragging) return;
	const hit = map.hasFeatureAtPixel(evt.pixel);
	map.getTargetElement().style.cursor = hit ? "pointer" : "";
});
//#endregion

//# sourceMappingURL=synthetic-points.js.map