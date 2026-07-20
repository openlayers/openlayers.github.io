import { Bn as load, Cn as OSM, Mn as Map, jn as TileLayer, kt as createLoader, ln as ImageSource, or as View, un as ImageLayer } from "./common.js";
//#region examples/wms-image-svg.js
new Map({
	layers: [new TileLayer({ source: new OSM() }), new ImageLayer({
		extent: [
			-13884991,
			2870341,
			-7455066,
			6338219
		],
		source: new ImageSource({ loader: createLoader({
			url: "https://ahocevar.com/geoserver/wms",
			params: {
				"LAYERS": "topp:states",
				"FORMAT": "image/svg+xml"
			},
			ratio: 1,
			load
		}) })
	})],
	target: "map",
	view: new View({
		center: [-10997148, 4569099],
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=wms-image-svg.js.map