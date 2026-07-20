import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/accessible.js
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
document.getElementById("zoom-out").onclick = function() {
	const view = map.getView();
	const zoom = view.getZoom();
	view.setZoom(zoom - 1);
};
document.getElementById("zoom-in").onclick = function() {
	const view = map.getView();
	const zoom = view.getZoom();
	view.setZoom(zoom + 1);
};
//#endregion

//# sourceMappingURL=accessible.js.map