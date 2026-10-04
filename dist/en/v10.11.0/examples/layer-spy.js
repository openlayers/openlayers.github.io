import { Cr as fromLonLat, Mn as Map, an as ImageTileSource, jn as TileLayer, or as View, st as getRenderPixel } from "./common.js";
//#region examples/layer-spy.js
var attributions = "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>";
var roads = new TileLayer({ source: new ImageTileSource({
	attributions,
	url: "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	tileSize: 512,
	maxZoom: 22
}) });
var imagery = new TileLayer({ source: new ImageTileSource({
	attributions,
	url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	tileSize: 512,
	maxZoom: 20
}) });
var container = document.getElementById("map");
var map = new Map({
	layers: [roads, imagery],
	target: container,
	view: new View({
		center: fromLonLat([-109, 46.5]),
		zoom: 6
	})
});
var radius = 75;
document.addEventListener("keydown", function(evt) {
	if (evt.key === "ArrowUp") {
		radius = Math.min(radius + 5, 150);
		map.render();
		evt.preventDefault();
	} else if (evt.key === "ArrowDown") {
		radius = Math.max(radius - 5, 25);
		map.render();
		evt.preventDefault();
	}
});
var mousePosition = null;
container.addEventListener("mousemove", function(event) {
	mousePosition = map.getEventPixel(event);
	map.render();
});
container.addEventListener("mouseout", function() {
	mousePosition = null;
	map.render();
});
imagery.on("prerender", function(event) {
	const ctx = event.context;
	ctx.save();
	ctx.beginPath();
	if (mousePosition) {
		const pixel = getRenderPixel(event, mousePosition);
		const offset = getRenderPixel(event, [mousePosition[0] + radius, mousePosition[1]]);
		const canvasRadius = Math.sqrt(Math.pow(offset[0] - pixel[0], 2) + Math.pow(offset[1] - pixel[1], 2));
		ctx.arc(pixel[0], pixel[1], canvasRadius, 0, 2 * Math.PI);
		ctx.lineWidth = 5 * canvasRadius / radius;
		ctx.strokeStyle = "rgba(0,0,0,0.5)";
		ctx.stroke();
	}
	ctx.clip();
});
imagery.on("postrender", function(event) {
	event.context.restore();
});
//#endregion

//# sourceMappingURL=layer-spy.js.map