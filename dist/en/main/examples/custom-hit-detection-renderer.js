import { Cn as OSM, Cr as fromLonLat, Jt as Circle, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, xn as Feature } from "./common.js";
//#region examples/custom-hit-detection-renderer.js
var columbusCircleCoords = fromLonLat([-73.98189, 40.76805]);
var labelTextStroke = "rgba(120, 120, 120, 1)";
var labelText = "Columbus Circle";
var pointerOverFeature = null;
var renderLabelText = (ctx, x, y, stroke) => {
	ctx.fillStyle = "rgba(255,0,0,1)";
	ctx.strokeStyle = stroke;
	ctx.lineWidth = 1;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = `bold 30px verdana`;
	ctx.filter = "drop-shadow(7px 7px 2px #e81)";
	ctx.fillText(labelText, x, y);
	ctx.strokeText(labelText, x, y);
};
var circleFeature = new Feature({ geometry: new Circle(columbusCircleCoords, 50) });
circleFeature.set("label-color", labelTextStroke);
circleFeature.setStyle(new Style({
	renderer(coordinates, state) {
		const [[x, y], [x1, y1]] = coordinates;
		const ctx = state.context;
		const dx = x1 - x;
		const dy = y1 - y;
		const radius = Math.sqrt(dx * dx + dy * dy);
		const innerRadius = 0;
		const outerRadius = radius * 1.4;
		const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
		gradient.addColorStop(0, "rgba(255,0,0,0)");
		gradient.addColorStop(.6, "rgba(255,0,0,0.2)");
		gradient.addColorStop(1, "rgba(255,0,0,0.8)");
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.strokeStyle = "rgba(255,0,0,1)";
		ctx.stroke();
		renderLabelText(ctx, x, y, circleFeature.get("label-color"));
	},
	hitDetectionRenderer(coordinates, state) {
		const [x, y] = coordinates[0];
		const ctx = state.context;
		renderLabelText(ctx, x, y, circleFeature.get("label-color"));
	}
}));
var map = new Map({
	layers: [new TileLayer({
		source: new OSM(),
		visible: true
	}), new VectorLayer({ source: new VectorSource({ features: [circleFeature] }) })],
	target: "map",
	view: new View({
		center: columbusCircleCoords,
		zoom: 19
	})
});
map.on("pointermove", (evt) => {
	const featureOver = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
		feature.set("label-color", "rgba(255,255,255,1)");
		return feature;
	});
	if (pointerOverFeature && pointerOverFeature != featureOver) pointerOverFeature.set("label-color", labelTextStroke);
	pointerOverFeature = featureOver;
});
//#endregion

//# sourceMappingURL=custom-hit-detection-renderer.js.map