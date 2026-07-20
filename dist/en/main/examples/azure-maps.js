import { Ar as useGeographic, Mn as Map, an as ImageTileSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/azure-maps.js
useGeographic();
var someTilesetId = [
	"microsoft.imagery",
	"microsoft.base.road",
	"microsoft.base.darkgrey"
];
var baseUrl = "https://atlas.microsoft.com/map/tile?zoom={z}&x={x}&y={y}&tileSize=256&language=EN&&api-version=2.0";
var subscriptionKey;
var currentLayer;
var map;
document.getElementById("auth-form").addEventListener("submit", (event) => {
	event.preventDefault();
	subscriptionKey = document.getElementById("secret").value.trim();
	map = new Map({
		target: "map",
		view: new View({
			center: [2.35, 48.85],
			zoom: 12
		})
	});
	document.getElementById("auth-interface").style.display = "none";
	document.getElementById("map-container").style.display = "block";
	document.querySelectorAll(".layer-btn").forEach((btn) => {
		btn.addEventListener("click", () => {
			updateLayer(Number(btn.value));
		});
	});
	updateLayer(0);
});
function updateLayer(index) {
	currentLayer = new TileLayer({ source: new ImageTileSource({
		url: `${baseUrl}&subscription-key=${subscriptionKey}&tilesetId=${someTilesetId[index]}`,
		crossOrigin: "anonymous",
		attributions: `© ${(/* @__PURE__ */ new Date()).getFullYear()} TomTom, Microsoft`
	}) });
	map.addLayer(currentLayer);
	map.once("rendercomplete", () => {
		for (const layer of map.getLayers().getArray()) {
			if (layer === currentLayer) break;
			map.removeLayer(layer);
		}
	});
	document.querySelectorAll(".layer-btn").forEach((btn) => {
		btn.classList.toggle("active", btn.value == index);
	});
}
//#endregion

//# sourceMappingURL=azure-maps.js.map