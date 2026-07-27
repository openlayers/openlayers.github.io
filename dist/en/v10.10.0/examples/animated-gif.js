import { In as Icon, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, hr as Point, jn as TileLayer, or as View, xn as Feature, yn as StadiaMaps } from "./common.js";
//#region examples/animated-gif.js
var iconFeature = new Feature({ geometry: new Point([0, 0]) });
var vectorLayer = new VectorLayer({ source: new VectorSource({ features: [iconFeature] }) });
var map = new Map({
	layers: [new TileLayer({ source: new StadiaMaps({ layer: "stamen_toner" }) }), vectorLayer],
	target: document.getElementById("map"),
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
gifler("data/globe.gif").frames(document.createElement("canvas"), function(ctx, frame) {
	if (!iconFeature.getStyle()) iconFeature.setStyle(new Style({ image: new Icon({
		img: ctx.canvas,
		opacity: .8
	}) }));
	ctx.clearRect(0, 0, frame.width, frame.height);
	ctx.drawImage(frame.buffer, frame.x, frame.y);
	map.render();
}, true);
map.on("pointermove", function(e) {
	const hit = map.hasFeatureAtPixel(e.pixel);
	map.getTargetElement().style.cursor = hit ? "pointer" : "";
});
//#endregion

//# sourceMappingURL=animated-gif.js.map