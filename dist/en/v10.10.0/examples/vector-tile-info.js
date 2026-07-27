import { $t as VectorTileLayer, Mn as Map, Zt as VectorTile, en as MVT, or as View } from "./common.js";
//#region examples/vector-tile-info.js
var map = new Map({
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	}),
	layers: [new VectorTileLayer({ source: new VectorTile({
		format: new MVT(),
		url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf"
	}) })]
});
map.getTargetElement().addEventListener("pointerleave", showInfo);
map.on("pointermove", (evt) => {
	if (evt.dragging) return;
	showInfo(evt);
});
var info = document.getElementById("info");
function showInfo(event) {
	const features = event.type === "pointerleave" ? [] : map.getFeaturesAtPixel(event.pixel);
	if (features.length == 0) {
		info.innerText = "";
		info.style.opacity = "0";
		return;
	}
	const properties = features[0].getProperties();
	info.innerText = JSON.stringify(properties, null, 2);
	info.style.opacity = "1";
}
//#endregion

//# sourceMappingURL=vector-tile-info.js.map