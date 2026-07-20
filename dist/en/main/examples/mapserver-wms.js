import { Mn as Map, kt as createLoader, ln as ImageSource, or as View, un as ImageLayer } from "./common.js";
//#region examples/mapserver-wms.js
new Map({
	layers: [new ImageLayer({ source: new ImageSource({ loader: createLoader({
		url: "https://demo.mapserver.org/cgi-bin/wms?",
		params: {
			LAYERS: ["bluemarble,country_bounds,cities"],
			VERSION: "1.3.0",
			FORMAT: "image/png"
		},
		projection: "EPSG:4326",
		hidpi: true,
		serverType: "mapserver"
	}) }) })],
	target: "map",
	view: new View({
		projection: "EPSG:4326",
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=mapserver-wms.js.map