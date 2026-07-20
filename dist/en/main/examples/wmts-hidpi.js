import { Mn as Map, Zr as DEVICE_PIXEL_RATIO, b as WMTSCapabilities, bt as WMTS, jn as TileLayer, or as View, xt as optionsFromCapabilities } from "./common.js";
//#region examples/wmts-hidpi.js
var capabilitiesUrl = "https://mapsneu.wien.gv.at/basemapneu/1.0.0/WMTSCapabilities.xml";
var hiDPI = DEVICE_PIXEL_RATIO > 1;
var layer = hiDPI ? "bmaphidpi" : "geolandbasemap";
var tilePixelRatio = hiDPI ? 2 : 1;
var map = new Map({
	target: "map",
	view: new View({
		center: [1823849, 6143760],
		zoom: 11
	})
});
fetch(capabilitiesUrl).then(function(response) {
	return response.text();
}).then(function(text) {
	const options = optionsFromCapabilities(new WMTSCapabilities().read(text), {
		layer,
		matrixSet: "google3857",
		style: "normal"
	});
	options.tilePixelRatio = tilePixelRatio;
	options.attributions = "Grundkarte: <a target=\"_blank\" href=\"https://basemap.at/\">basemap.at</a>";
	map.addLayer(new TileLayer({ source: new WMTS(options) }));
});
//#endregion

//# sourceMappingURL=wmts-hidpi.js.map