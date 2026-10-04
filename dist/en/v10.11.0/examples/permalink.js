import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/permalink.js
var zoom = 2;
var center = [0, 0];
var rotation = 0;
if (window.location.hash !== "") {
	const parts = window.location.hash.replace("#map=", "").split("/");
	if (parts.length === 4) {
		zoom = parseFloat(parts[0]);
		center = [parseFloat(parts[1]), parseFloat(parts[2])];
		rotation = parseFloat(parts[3]);
	}
}
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center,
		zoom,
		rotation
	})
});
var shouldUpdate = true;
var view = map.getView();
var updatePermalink = function() {
	if (!shouldUpdate) {
		shouldUpdate = true;
		return;
	}
	const center = view.getCenter();
	const hash = "#map=" + view.getZoom().toFixed(2) + "/" + center[0].toFixed(2) + "/" + center[1].toFixed(2) + "/" + view.getRotation();
	const state = {
		zoom: view.getZoom(),
		center: view.getCenter(),
		rotation: view.getRotation()
	};
	window.history.pushState(state, "map", hash);
};
map.on("moveend", updatePermalink);
window.addEventListener("popstate", function(event) {
	if (event.state === null) return;
	map.getView().setCenter(event.state.center);
	map.getView().setZoom(event.state.zoom);
	map.getView().setRotation(event.state.rotation);
	shouldUpdate = false;
});
//#endregion

//# sourceMappingURL=permalink.js.map