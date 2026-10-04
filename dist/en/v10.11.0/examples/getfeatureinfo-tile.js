import { Ct as TileWMS, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/getfeatureinfo-tile.js
var wmsSource = new TileWMS({
	url: "https://ahocevar.com/geoserver/wms",
	params: {
		"LAYERS": "ne:ne",
		"TILED": true
	},
	serverType: "geoserver",
	crossOrigin: "anonymous"
});
var wmsLayer = new TileLayer({ source: wmsSource });
var view = new View({
	center: [0, 0],
	zoom: 1
});
var map = new Map({
	layers: [wmsLayer],
	target: "map",
	view
});
map.on("singleclick", function(evt) {
	document.getElementById("info").innerHTML = "";
	const viewResolution = view.getResolution();
	const url = wmsSource.getFeatureInfoUrl(evt.coordinate, viewResolution, "EPSG:3857", { "INFO_FORMAT": "text/html" });
	if (url) fetch(url).then((response) => response.text()).then((html) => {
		document.getElementById("info").innerHTML = html;
	});
});
map.on("pointermove", function(evt) {
	if (evt.dragging) return;
	const data = wmsLayer.getData(evt.pixel);
	const hit = data && data[3] > 0;
	map.getTargetElement().style.cursor = hit ? "pointer" : "";
});
//#endregion

//# sourceMappingURL=getfeatureinfo-tile.js.map