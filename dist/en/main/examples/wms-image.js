import { Cn as OSM, Mn as Map, Ot as ImageWMS, jn as TileLayer, or as View, un as ImageLayer } from "./common.js";
//#region examples/wms-image.js
new Map({
	layers: [new TileLayer({ source: new OSM() }), new ImageLayer({
		extent: [
			-13884991,
			2870341,
			-7455066,
			6338219
		],
		source: new ImageWMS({
			url: "https://ahocevar.com/geoserver/wms",
			params: { "LAYERS": "topp:states" },
			ratio: 1,
			serverType: "geoserver"
		})
	})],
	target: "map",
	view: new View({
		center: [-10997148, 4569099],
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=wms-image.js.map