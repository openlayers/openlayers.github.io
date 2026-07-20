import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/lazy-source.js
var source = new OSM();
var layer = new TileLayer();
new Map({
	layers: [layer],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
document.getElementById("set-source").onclick = function() {
	layer.setSource(source);
};
document.getElementById("unset-source").onclick = function() {
	layer.setSource(null);
};
//#endregion

//# sourceMappingURL=lazy-source.js.map