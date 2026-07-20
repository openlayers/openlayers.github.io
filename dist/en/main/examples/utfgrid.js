import { Mn as Map, St as UTFGrid, at as Overlay, jn as TileLayer, or as View, wt as TileJSON } from "./common.js";
//#region examples/utfgrid.js
var mapLayer = new TileLayer({ source: new TileJSON({ url: "https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ" }) });
var gridSource = new UTFGrid({ url: "https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ" });
var gridLayer = new TileLayer({ source: gridSource });
var view = new View({
	center: [0, 0],
	zoom: 1
});
var mapElement = document.getElementById("map");
var map = new Map({
	layers: [mapLayer, gridLayer],
	target: mapElement,
	view
});
var infoElement = document.getElementById("country-info");
var flagElement = document.getElementById("country-flag");
var nameElement = document.getElementById("country-name");
var infoOverlay = new Overlay({
	element: infoElement,
	offset: [15, 15],
	stopEvent: false
});
map.addOverlay(infoOverlay);
var displayCountryInfo = function(coordinate) {
	const viewResolution = view.getResolution();
	gridSource.forDataAtCoordinateAndResolution(coordinate, viewResolution, function(data) {
		mapElement.style.cursor = data ? "pointer" : "";
		if (data) {
			flagElement.src = "data:image/png;base64," + data["flag_png"];
			nameElement.innerHTML = data["admin"];
		}
		infoOverlay.setPosition(data ? coordinate : void 0);
	});
};
map.on("pointermove", function(evt) {
	if (evt.dragging) return;
	displayCountryInfo(map.getEventCoordinate(evt.originalEvent));
});
map.on("click", function(evt) {
	displayCountryInfo(evt.coordinate);
});
//#endregion

//# sourceMappingURL=utfgrid.js.map