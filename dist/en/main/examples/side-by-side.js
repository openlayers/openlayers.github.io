import { Mn as Map, an as ImageTileSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/side-by-side.js
var attributions = "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>";
var roadLayer = new TileLayer({ source: new ImageTileSource({
	attributions,
	url: "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	tileSize: 512,
	maxZoom: 22
}) });
var aerialLayer = new TileLayer({ source: new ImageTileSource({
	attributions,
	url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	tileSize: 512,
	maxZoom: 20
}) });
var view = new View({
	center: [-6655.5402445057125, 6709968.258934638],
	zoom: 13
});
new Map({
	target: "roadMap",
	layers: [roadLayer],
	view
});
new Map({
	target: "aerialMap",
	layers: [aerialLayer],
	view
});
//#endregion

//# sourceMappingURL=side-by-side.js.map