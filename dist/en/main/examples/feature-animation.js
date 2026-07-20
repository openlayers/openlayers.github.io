import { $r as unByKey, Cn as OSM, Cr as fromLonLat, Fn as Stroke, Ir as easeOut, Mn as Map, Pn as Style, Rn as CircleStyle, bn as VectorLayer, ct as getVectorContext, dn as VectorSource, hr as Point, jn as TileLayer, or as View, xn as Feature } from "./common.js";
//#region examples/feature-animation.js
var tileLayer = new TileLayer({ source: new OSM({ wrapX: false }) });
var source = new VectorSource({ wrapX: false });
var map = new Map({
	layers: [tileLayer, new VectorLayer({ source })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 1,
		multiWorld: true
	})
});
function addRandomFeature() {
	const feature = new Feature(new Point(fromLonLat([Math.random() * 360 - 180, Math.random() * 170 - 85])));
	source.addFeature(feature);
}
var duration = 3e3;
function flash(feature) {
	const start = Date.now();
	const flashGeom = feature.getGeometry().clone();
	const listenerKey = tileLayer.on("postrender", animate);
	function animate(event) {
		const elapsed = event.frameState.time - start;
		if (elapsed >= duration) {
			unByKey(listenerKey);
			return;
		}
		const vectorContext = getVectorContext(event);
		const elapsedRatio = elapsed / duration;
		const radius = easeOut(elapsedRatio) * 25 + 5;
		const opacity = easeOut(1 - elapsedRatio);
		const style = new Style({ image: new CircleStyle({
			radius,
			stroke: new Stroke({
				color: "rgba(255, 0, 0, " + opacity + ")",
				width: .25 + opacity
			})
		}) });
		vectorContext.setStyle(style);
		vectorContext.drawGeometry(flashGeom);
		map.render();
	}
}
source.on("addfeature", function(e) {
	flash(e.feature);
});
window.setInterval(addRandomFeature, 1e3);
//#endregion

//# sourceMappingURL=feature-animation.js.map