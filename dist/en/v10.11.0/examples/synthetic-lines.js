import { Fn as Stroke, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, gn as LineString, or as View, xn as Feature } from "./common.js";
//#region examples/synthetic-lines.js
var count = 1e4;
var features = new Array(count);
var startPoint = [0, 0];
var endPoint;
var delta;
var deltaX;
var deltaY;
var signX = 1;
var signY = -1;
var i;
for (i = 0; i < count; ++i) {
	delta = (i + 1) * 2500;
	if (i % 2 === 0) signY *= -1;
	else signX *= -1;
	deltaX = delta * signX;
	deltaY = delta * signY;
	endPoint = [startPoint[0] + deltaX, startPoint[1] + deltaY];
	features[i] = new Feature({ "geometry": new LineString([startPoint, endPoint]) });
	startPoint = endPoint;
}
var vector = new VectorLayer({
	source: new VectorSource({
		features,
		wrapX: false
	}),
	style: new Style({ stroke: new Stroke({
		color: "#666666",
		width: 1
	}) })
});
var view = new View({
	center: [0, 0],
	zoom: 0
});
new Map({
	layers: [vector],
	target: "map",
	view
});
//#endregion

//# sourceMappingURL=synthetic-lines.js.map