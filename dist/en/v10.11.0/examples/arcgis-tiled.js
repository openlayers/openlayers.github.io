import { Cn as OSM, Mn as Map, jn as TileLayer, or as View, sn as TileArcGISRest } from "./common.js";
//#region examples/arcgis-tiled.js
new Map({
	layers: [new TileLayer({ source: new OSM() }), new TileLayer({
		extent: [
			-13884991,
			2870341,
			-7455066,
			6338219
		],
		source: new TileArcGISRest({ url: "https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/USA/MapServer" })
	})],
	target: "map",
	view: new View({
		center: [-10997148, 4569099],
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=arcgis-tiled.js.map