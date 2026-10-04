import { Cn as OSM, Mn as Map, Yr as getWidth, bt as WMTS, jn as TileLayer, kn as WMTSTileGrid, or as View, qr as getTopLeft, wr as get } from "./common.js";
//#region examples/wmts.js
var projection = get("EPSG:3857");
var projectionExtent = projection.getExtent();
var size = getWidth(projectionExtent) / 256;
var resolutions = new Array(19);
var matrixIds = new Array(19);
for (let z = 0; z < 19; ++z) {
	resolutions[z] = size / Math.pow(2, z);
	matrixIds[z] = z;
}
new Map({
	layers: [new TileLayer({ source: new OSM() }), new TileLayer({
		opacity: .7,
		source: new WMTS({
			attributions: "Tiles © <a href=\"https://mrdata.usgs.gov/geology/state/\" target=\"_blank\">USGS</a>",
			url: "https://mrdata.usgs.gov/mapcache/wmts",
			layer: "sgmc2",
			matrixSet: "GoogleMapsCompatible",
			format: "image/png",
			projection,
			tileGrid: new WMTSTileGrid({
				origin: getTopLeft(projectionExtent),
				resolutions,
				matrixIds
			}),
			style: "default",
			wrapX: true
		})
	})],
	target: "map",
	view: new View({
		center: [-11158582, 4813697],
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=wmts.js.map