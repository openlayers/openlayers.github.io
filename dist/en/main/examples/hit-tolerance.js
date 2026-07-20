import { Cn as OSM, Fn as Stroke, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, gn as LineString, jn as TileLayer, or as View, xn as Feature } from "./common.js";
//#region examples/hit-tolerance.js
var raster = new TileLayer({ source: new OSM() });
var style = new Style({ stroke: new Stroke({
	color: "black",
	width: 1
}) });
var feature = new Feature(new LineString([[-4e6, 0], [4e6, 0]]));
var map = new Map({
	layers: [raster, new VectorLayer({
		source: new VectorSource({ features: [feature] }),
		style
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var hitTolerance;
var statusElement = document.getElementById("status");
map.on("singleclick", function(e) {
	let hit = false;
	map.forEachFeatureAtPixel(e.pixel, function() {
		hit = true;
	}, { hitTolerance });
	if (hit) {
		style.getStroke().setColor("green");
		statusElement.innerHTML = "A feature got hit!";
	} else {
		style.getStroke().setColor("black");
		statusElement.innerHTML = "No feature got hit.";
	}
	feature.changed();
});
var selectHitToleranceElement = document.getElementById("hitTolerance");
var circleCanvas = document.getElementById("circle");
var changeHitTolerance = function() {
	hitTolerance = parseInt(selectHitToleranceElement.value, 10);
	const size = 2 * hitTolerance + 2;
	circleCanvas.width = size;
	circleCanvas.height = size;
	const ctx = circleCanvas.getContext("2d");
	ctx.clearRect(0, 0, size, size);
	ctx.beginPath();
	ctx.arc(hitTolerance + 1, hitTolerance + 1, hitTolerance + .5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
};
selectHitToleranceElement.onchange = changeHitTolerance;
changeHitTolerance();
//#endregion

//# sourceMappingURL=hit-tolerance.js.map