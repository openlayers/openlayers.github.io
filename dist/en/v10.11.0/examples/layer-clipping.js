import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/layer-clipping.js
var osm = new TileLayer({ source: new OSM() });
new Map({
	layers: [osm],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
osm.on("prerender", function(event) {
	const ctx = event.context;
	const matrix = event.inversePixelTransform;
	const canvasPixelRatio = Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
	const canvasRotation = -Math.atan2(matrix[1], matrix[0]);
	ctx.save();
	ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
	ctx.rotate(-canvasRotation);
	ctx.scale(3 * canvasPixelRatio, 3 * canvasPixelRatio);
	ctx.translate(-75, -80);
	ctx.beginPath();
	ctx.moveTo(75, 40);
	ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
	ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
	ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
	ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
	ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
	ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
	ctx.clip();
	ctx.translate(75, 80);
	ctx.scale(1 / 3 / canvasPixelRatio, 1 / 3 / canvasPixelRatio);
	ctx.rotate(canvasRotation);
	ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
});
osm.on("postrender", function(event) {
	event.context.restore();
});
//#endregion

//# sourceMappingURL=layer-clipping.js.map