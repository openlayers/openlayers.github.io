import { G as Modify, Gt as Draw, Mn as Map, W as Snap, an as ImageTileSource, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON } from "./common.js";
//#region examples/draw-modify-trace-snap.js
var raster = new TileLayer({ source: new ImageTileSource({
	url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	maxZoom: 20
}) });
var baseVector = new VectorLayer({
	source: new VectorSource({
		format: new GeoJSON(),
		url: "data/geojson/fire.json"
	}),
	style: {
		"fill-color": "rgba(255, 0, 0, 0.3)",
		"stroke-color": "rgba(255, 0, 0, 0.9)",
		"stroke-width": .5
	}
});
var drawVector = new VectorLayer({
	source: new VectorSource(),
	style: {
		"stroke-color": "rgba(100, 255, 0, 1)",
		"stroke-width": 2,
		"fill-color": "rgba(100, 255, 0, 0.3)"
	}
});
var map = new Map({
	layers: [
		raster,
		baseVector,
		drawVector
	],
	target: "map",
	view: new View({
		center: [-13378949, 5943751],
		zoom: 11,
		maxZoom: 23
	})
});
var drawInteraction;
var snapInteraction = new Snap({ source: baseVector.getSource() });
var modifyInteraction = new Modify({
	source: drawVector.getSource(),
	trace: true,
	traceSource: baseVector.getSource()
});
var typeSelect = document.getElementById("type");
function addInteraction() {
	const value = typeSelect.value;
	map.addInteraction(modifyInteraction);
	if (value !== "None") {
		drawInteraction = new Draw({
			type: value,
			source: drawVector.getSource(),
			trace: true,
			traceSource: baseVector.getSource(),
			style: {
				"stroke-color": "rgba(255, 255, 100, 0.5)",
				"stroke-width": 1.5,
				"fill-color": "rgba(255, 255, 100, 0.25)",
				"circle-radius": 6,
				"circle-fill-color": "rgba(255, 255, 100, 0.5)"
			}
		});
		drawInteraction.once("drawend", () => {
			typeSelect.value = "None";
			setTimeout(changeDrawMode, 0);
		});
		map.addInteraction(drawInteraction);
	}
	map.addInteraction(snapInteraction);
}
function changeDrawMode() {
	if (drawInteraction) {
		map.removeInteraction(drawInteraction);
		drawInteraction = null;
	}
	map.removeInteraction(modifyInteraction);
	map.removeInteraction(snapInteraction);
	addInteraction();
}
typeSelect.onchange = changeDrawMode;
addInteraction();
//#endregion

//# sourceMappingURL=draw-modify-trace-snap.js.map