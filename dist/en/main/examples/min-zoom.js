import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/min-zoom.js
var viewport = document.getElementById("map");
function getMinZoom() {
	const width = viewport.clientWidth;
	return Math.ceil(Math.LOG2E * Math.log(width / 256));
}
var initialZoom = getMinZoom();
var view = new View({
	center: [0, 0],
	minZoom: initialZoom,
	zoom: initialZoom
});
new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view
});
window.addEventListener("resize", function() {
	const minZoom = getMinZoom();
	if (minZoom !== view.getMinZoom()) view.setMinZoom(minZoom);
});
//#endregion

//# sourceMappingURL=min-zoom.js.map