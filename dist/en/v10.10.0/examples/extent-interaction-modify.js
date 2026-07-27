import { Cn as OSM, Mn as Map, Qn as never, R as Extent, jn as TileLayer, kr as transformExtent, or as View } from "./common.js";
//#region examples/extent-interaction-modify.js
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var extent = new Extent({
	extent: transformExtent([
		-10,
		-10,
		10,
		10
	], "EPSG:4326", "EPSG:3857"),
	createCondition: never,
	drag: true,
	boxStyle: {
		"fill-color": "rgba(255, 255, 255, 0.4)",
		"stroke-color": "#3399CC",
		"stroke-width": 1.25
	}
});
map.addInteraction(extent);
//#endregion

//# sourceMappingURL=extent-interaction-modify.js.map