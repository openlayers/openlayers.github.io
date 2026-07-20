import { Mn as Map, an as ImageTileSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/load-events.js
var map = new Map({
	layers: [new TileLayer({ source: new ImageTileSource({
		attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
		url: "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
		tileSize: 512
	}) })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
map.on("loadstart", function() {
	map.getTargetElement().classList.add("spinner");
});
map.on("loadend", function() {
	map.getTargetElement().classList.remove("spinner");
});
//#endregion

//# sourceMappingURL=load-events.js.map