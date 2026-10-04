import { Cn as OSM, Mn as Map, Rr as createStringXY, jn as TileLayer, or as View, rr as defaults, vt as MousePosition } from "./common.js";
//#region examples/mouse-position.js
var mousePositionControl = new MousePosition({
	coordinateFormat: createStringXY(4),
	projection: "EPSG:4326",
	className: "custom-mouse-position",
	target: document.getElementById("mouse-position")
});
new Map({
	controls: defaults().extend([mousePositionControl]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
document.getElementById("projection").addEventListener("change", function(event) {
	mousePositionControl.setProjection(event.target.value);
});
document.getElementById("precision").addEventListener("change", function(event) {
	const format = createStringXY(event.target.valueAsNumber);
	mousePositionControl.setCoordinateFormat(format);
});
//#endregion

//# sourceMappingURL=mouse-position.js.map