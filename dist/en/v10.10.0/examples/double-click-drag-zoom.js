import { Cn as OSM, Mn as Map, Wn as defaults, et as DblClickDragZoom, jn as TileLayer, or as View } from "./common.js";
//#region examples/double-click-drag-zoom.js
new Map({
	interactions: defaults().extend([new DblClickDragZoom()]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=double-click-drag-zoom.js.map