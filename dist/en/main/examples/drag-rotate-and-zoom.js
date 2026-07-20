import { Cn as OSM, K as DragRotateAndZoom, Mn as Map, Wn as defaults, jn as TileLayer, or as View } from "./common.js";
//#region examples/drag-rotate-and-zoom.js
new Map({
	interactions: defaults().extend([new DragRotateAndZoom()]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=drag-rotate-and-zoom.js.map