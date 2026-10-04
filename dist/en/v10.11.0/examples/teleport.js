import { Cn as OSM, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/teleport.js
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
map.setTarget("map1");
document.getElementById("teleport").addEventListener("click", function() {
	const target = map.getTarget() === "map1" ? "map2" : "map1";
	map.setTarget(target);
}, false);
//#endregion

//# sourceMappingURL=teleport.js.map