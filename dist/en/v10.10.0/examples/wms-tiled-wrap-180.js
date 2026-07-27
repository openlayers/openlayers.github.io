import { Cn as OSM, Ct as TileWMS, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/wms-tiled-wrap-180.js
new Map({
	layers: [new TileLayer({ source: new OSM() }), new TileLayer({ source: new TileWMS({
		url: "https://ahocevar.com/geoserver/ne/wms",
		params: {
			"LAYERS": "ne:ne_10m_admin_0_countries",
			"TILED": true
		},
		serverType: "geoserver"
	}) })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 1
	})
});
//#endregion

//# sourceMappingURL=wms-tiled-wrap-180.js.map