import { Cn as OSM, Mn as Map, R as Extent, jn as TileLayer, nr as shiftKeyOnly, or as View } from "./common.js";
//#region examples/extent-interaction.js
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var extent = new Extent({ condition: shiftKeyOnly });
map.addInteraction(extent);
//#endregion

//# sourceMappingURL=extent-interaction.js.map