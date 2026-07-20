import { Cr as fromLonLat, Mn as Map, Yr as getWidth, bt as WMTS, jn as TileLayer, kn as WMTSTileGrid, or as View, wr as get } from "./common.js";
//#region examples/wmts-ign.js
var map = new Map({
	target: "map",
	view: new View({
		zoom: 5,
		center: fromLonLat([5, 45])
	})
});
var resolutions = [];
var matrixIds = [];
var maxResolution = getWidth(get("EPSG:3857").getExtent()) / 256;
for (let i = 0; i < 20; i++) {
	matrixIds[i] = i.toString();
	resolutions[i] = maxResolution / Math.pow(2, i);
}
var ign = new TileLayer({ source: new WMTS({
	url: "https://data.geopf.fr/wmts",
	layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
	matrixSet: "PM",
	format: "image/png",
	projection: "EPSG:3857",
	tileGrid: new WMTSTileGrid({
		origin: [-20037508, 20037508],
		resolutions,
		matrixIds
	}),
	style: "normal",
	attributions: "<a href=\"https://www.ign.fr/\" target=\"_blank\"><img src=\"https://data.geopf.fr/annexes/ressources/logos/ign.gif\" title=\"Institut national de l'information géographique et forestière\" alt=\"IGN\"></a>"
}) });
map.addLayer(ign);
//#endregion

//# sourceMappingURL=wmts-ign.js.map