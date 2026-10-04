import { Cn as OSM, Mn as Map, an as ImageTileSource, jn as TileLayer, or as View, st as getRenderPixel } from "./common.js";
//#region examples/layer-swipe.js
var osm = new TileLayer({ source: new OSM() });
var aerial = new TileLayer({ source: new ImageTileSource({
	attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
	url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	tileSize: 512,
	maxZoom: 20
}) });
var map = new Map({
	layers: [osm, aerial],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var swipe = document.getElementById("swipe");
aerial.on("prerender", function(event) {
	const ctx = event.context;
	const mapSize = map.getSize();
	const width = mapSize[0] * (Number(swipe.value) / 100);
	const tl = getRenderPixel(event, [width, 0]);
	const tr = getRenderPixel(event, [mapSize[0], 0]);
	const bl = getRenderPixel(event, [width, mapSize[1]]);
	const br = getRenderPixel(event, mapSize);
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(tl[0], tl[1]);
	ctx.lineTo(bl[0], bl[1]);
	ctx.lineTo(br[0], br[1]);
	ctx.lineTo(tr[0], tr[1]);
	ctx.closePath();
	ctx.clip();
});
aerial.on("postrender", function(event) {
	event.context.restore();
});
swipe.addEventListener("input", function() {
	map.render();
});
//#endregion

//# sourceMappingURL=layer-swipe.js.map