import { Cn as OSM, Dr as toLonLat, Jr as getTopRight, Mn as Map, Wr as getBottomLeft, jn as TileLayer, or as View } from "./common.js";
//#region examples/moveend.js
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
function display(id, value) {
	document.getElementById(id).value = value.toFixed(2);
}
function wrapLon(value) {
	return value - Math.floor((value + 180) / 360) * 360;
}
function onMoveEnd(evt) {
	const map = evt.map;
	const extent = map.getView().calculateExtent(map.getSize());
	const bottomLeft = toLonLat(getBottomLeft(extent));
	const topRight = toLonLat(getTopRight(extent));
	display("left", wrapLon(bottomLeft[0]));
	display("bottom", bottomLeft[1]);
	display("right", wrapLon(topRight[0]));
	display("top", topRight[1]);
}
map.on("moveend", onMoveEnd);
//#endregion

//# sourceMappingURL=moveend.js.map