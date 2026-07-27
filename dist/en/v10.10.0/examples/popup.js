import { Dr as toLonLat, Mn as Map, an as ImageTileSource, at as Overlay, jn as TileLayer, or as View, zr as toStringHDMS } from "./common.js";
//#region examples/popup.js
/**
* Elements that make up the popup.
*/
var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");
/**
* Create an overlay to anchor the popup to the map.
*/
var overlay = new Overlay({
	element: container,
	autoPan: { animation: { duration: 250 } }
});
/**
* Add a click handler to hide the popup.
* @return {boolean} Don't follow the href.
*/
closer.onclick = function() {
	overlay.setPosition(void 0);
	closer.blur();
	return false;
};
/**
* Add a click handler to the map to render the popup.
*/
new Map({
	layers: [new TileLayer({ source: new ImageTileSource({
		attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
		url: "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
		tileSize: 512
	}) })],
	overlays: [overlay],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
}).on("singleclick", function(evt) {
	const coordinate = evt.coordinate;
	content.innerHTML = "<p>You clicked here:</p><code>" + toStringHDMS(toLonLat(coordinate)) + "</code>";
	overlay.setPosition(coordinate);
});
//#endregion

//# sourceMappingURL=popup.js.map