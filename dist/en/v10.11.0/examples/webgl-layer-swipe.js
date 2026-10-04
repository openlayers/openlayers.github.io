import { Cn as OSM, Ht as WebGLTileLayer, Mn as Map, an as ImageTileSource, or as View, st as getRenderPixel } from "./common.js";
//#region examples/webgl-layer-swipe.js
var osm = new WebGLTileLayer({ source: new OSM({ wrapX: true }) });
var imagery = new WebGLTileLayer({ source: new ImageTileSource({
	url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
	maxZoom: 20
}) });
var map = new Map({
	layers: [osm, imagery],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var swipe = document.getElementById("swipe");
imagery.on("prerender", function(event) {
	const gl = event.context;
	gl.enable(gl.SCISSOR_TEST);
	const mapSize = map.getSize();
	const bottomLeft = getRenderPixel(event, [0, mapSize[1]]);
	const topRight = getRenderPixel(event, [mapSize[0], 0]);
	const width = Math.round((topRight[0] - bottomLeft[0]) * (Number(swipe.value) / 100));
	const height = topRight[1] - bottomLeft[1];
	gl.scissor(bottomLeft[0], bottomLeft[1], width, height);
});
imagery.on("postrender", function(event) {
	const gl = event.context;
	gl.disable(gl.SCISSOR_TEST);
});
swipe.addEventListener("input", function() {
	map.render();
});
//#endregion

//# sourceMappingURL=webgl-layer-swipe.js.map