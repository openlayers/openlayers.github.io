import { Cn as OSM, E as ZoomToExtent, Mn as Map, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/navigation-controls.js
new Map({
	controls: defaults().extend([new ZoomToExtent({ extent: [
		813079.7791264898,
		5929220.284081122,
		848966.9639063801,
		5936863.986909639
	] })]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=navigation-controls.js.map