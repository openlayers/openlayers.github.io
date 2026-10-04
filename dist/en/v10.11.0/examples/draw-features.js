import { Cn as OSM, Gt as Draw, Mn as Map, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/draw-features.js
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource({ wrapX: false });
var map = new Map({
	layers: [raster, new VectorLayer({ source })],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 4
	})
});
var typeSelect = document.getElementById("type");
var draw;
function addInteraction() {
	if (typeSelect.value !== "None") {
		draw = new Draw({
			source,
			type: typeSelect.value
		});
		map.addInteraction(draw);
	}
}
/**
* Handle change event.
*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	addInteraction();
};
document.getElementById("undo").addEventListener("click", function() {
	draw.removeLastPoint();
});
addInteraction();
//#endregion

//# sourceMappingURL=draw-features.js.map