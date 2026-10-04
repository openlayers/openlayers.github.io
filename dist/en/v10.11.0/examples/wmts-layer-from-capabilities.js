import { Cn as OSM, Mn as Map, b as WMTSCapabilities, bt as WMTS, jn as TileLayer, or as View, xt as optionsFromCapabilities } from "./common.js";
//#region examples/wmts-layer-from-capabilities.js
var parser = new WMTSCapabilities();
fetch("data/WMTSCapabilities.xml").then(function(response) {
	return response.text();
}).then(function(text) {
	const options = optionsFromCapabilities(parser.read(text), {
		layer: "layer-7328",
		matrixSet: "EPSG:3857"
	});
	new Map({
		layers: [new TileLayer({
			source: new OSM(),
			opacity: .7
		}), new TileLayer({
			opacity: 1,
			source: new WMTS(options)
		})],
		target: "map",
		view: new View({
			center: [19412406.33, -5050500.21],
			zoom: 5
		})
	});
});
//#endregion

//# sourceMappingURL=wmts-layer-from-capabilities.js.map