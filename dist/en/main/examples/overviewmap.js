import { C as OverviewMap, Cn as OSM, Mn as Map, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/overviewmap.js
var source = new OSM();
var overviewMapControl = new OverviewMap({ layers: [new TileLayer({ source })] });
new Map({
	controls: defaults().extend([overviewMapControl]),
	layers: [new TileLayer({ source })],
	target: "map",
	view: new View({
		center: [5e5, 6e6],
		zoom: 7
	})
});
//#endregion

//# sourceMappingURL=overviewmap.js.map