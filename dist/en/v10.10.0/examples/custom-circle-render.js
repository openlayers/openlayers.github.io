import { Cn as OSM, Jt as Circle, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, xn as Feature } from "./common.js";
//#region examples/custom-circle-render.js
var circleFeature = new Feature({ geometry: new Circle([12127398.797692968, 4063894.123105166], 50) });
circleFeature.setStyle(new Style({ renderer(coordinates, state) {
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
	ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
	ctx.strokeStyle = "rgba(255,0,0,1)";
	ctx.stroke();
} }));
new Map({
	layers: [new TileLayer({
		source: new OSM(),
		visible: true
	}), new VectorLayer({ source: new VectorSource({ features: [circleFeature] }) })],
	target: "map",
	view: new View({
		center: [12127398.797692968, 4063894.123105166],
		zoom: 19
	})
});
//#endregion

//# sourceMappingURL=custom-circle-render.js.map