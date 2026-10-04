import { Cn as OSM, Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, ct as getVectorContext, hr as Point, jn as TileLayer, mn as MultiPoint, or as View } from "./common.js";
//#region examples/dynamic-data.js
var tileLayer = new TileLayer({ source: new OSM() });
var map = new Map({
	layers: [tileLayer],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var imageStyle = new Style({ image: new CircleStyle({
	radius: 5,
	fill: new Fill({ color: "yellow" }),
	stroke: new Stroke({
		color: "red",
		width: 1
	})
}) });
var headInnerImageStyle = new Style({ image: new CircleStyle({
	radius: 2,
	fill: new Fill({ color: "blue" })
}) });
var headOuterImageStyle = new Style({ image: new CircleStyle({
	radius: 5,
	fill: new Fill({ color: "black" })
}) });
var n = 200;
var omegaTheta = 3e4;
var r = 2e6;
var p = 2e6;
tileLayer.on("postrender", function(event) {
	const vectorContext = getVectorContext(event);
	const frameState = event.frameState;
	const theta = 2 * Math.PI * frameState.time / omegaTheta;
	const coordinates = [];
	let i;
	for (i = 0; i < n; ++i) {
		const t = theta + 2 * Math.PI * i / n;
		const x = 9e6 * Math.cos(t) + p * Math.cos(9e6 * t / r);
		const y = 9e6 * Math.sin(t) + p * Math.sin(9e6 * t / r);
		coordinates.push([x, y]);
	}
	vectorContext.setStyle(imageStyle);
	vectorContext.drawGeometry(new MultiPoint(coordinates));
	const headPoint = new Point(coordinates[coordinates.length - 1]);
	vectorContext.setStyle(headOuterImageStyle);
	vectorContext.drawGeometry(headPoint);
	vectorContext.setStyle(headInnerImageStyle);
	vectorContext.drawGeometry(headPoint);
	map.render();
});
map.render();
//#endregion

//# sourceMappingURL=dynamic-data.js.map