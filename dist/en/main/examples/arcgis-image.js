import { Cn as OSM, Mn as Map, cn as ImageArcGISRest, jn as TileLayer, or as View, un as ImageLayer } from "./common.js";
//#region examples/arcgis-image.js
new Map({
	layers: [new TileLayer({ source: new OSM() }), new ImageLayer({ source: new ImageArcGISRest({
		ratio: 1,
		params: {},
		url: "https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/USA/MapServer"
	}) })],
	target: "map",
	view: new View({
		center: [-10997148, 4569099],
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=arcgis-image.js.map