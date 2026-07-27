import { Cr as fromLonLat, Mn as Map, Tt as RasterSource, an as ImageTileSource, jn as TileLayer, or as View, un as ImageLayer } from "./common.js";
//#region examples/sea-level.js
function flood(pixels, data) {
	const pixel = pixels[0];
	if (pixel[3]) if (-1e4 + (pixel[0] * 256 * 256 + pixel[1] * 256 + pixel[2]) * .1 <= data.level) {
		pixel[0] = 134;
		pixel[1] = 203;
		pixel[2] = 249;
		pixel[3] = 255;
	} else pixel[3] = 0;
	return pixel;
}
var attributions = "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>";
var raster = new RasterSource({
	sources: [new ImageTileSource({
		url: "https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
		tileSize: 512,
		maxZoom: 14,
		interpolate: false
	})],
	operation: flood
});
var map = new Map({
	target: "map",
	layers: [new TileLayer({ source: new ImageTileSource({
		attributions,
		url: "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
		tileSize: 512,
		maxZoom: 22
	}) }), new ImageLayer({
		opacity: .6,
		source: raster
	})],
	view: new View({
		center: fromLonLat([-122.3267, 37.8377]),
		zoom: 11
	})
});
var control = document.getElementById("level");
var output = document.getElementById("output");
control.addEventListener("input", function() {
	output.innerText = control.value;
	raster.changed();
});
output.innerText = control.value;
raster.on("beforeoperations", function(event) {
	event.data.level = control.value;
});
var locations = document.getElementsByClassName("location");
for (let i = 0, ii = locations.length; i < ii; ++i) locations[i].addEventListener("click", relocate);
function relocate(event) {
	const data = event.target.dataset;
	const view = map.getView();
	view.setCenter(fromLonLat(data.center.split(",").map(Number)));
	view.setZoom(Number(data.zoom));
}
//#endregion

//# sourceMappingURL=sea-level.js.map