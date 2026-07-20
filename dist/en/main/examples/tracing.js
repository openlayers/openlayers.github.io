import { Gt as Draw, Ht as WebGLTileLayer, Mn as Map, W as Snap, an as ImageTileSource, bn as VectorLayer, dn as VectorSource, or as View, rn as GeoJSON } from "./common.js";
//#region examples/tracing.js
var raster = new WebGLTileLayer({ source: new ImageTileSource({
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
		zoom: 11
	})
});
var drawInteraction;
var snapInteraction = new Snap({ source: baseVector.getSource() });
var typeSelect = document.getElementById("type");
function addInteraction() {
	const value = typeSelect.value;
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
		map.addInteraction(drawInteraction);
		map.addInteraction(snapInteraction);
	}
}
typeSelect.onchange = function() {
	map.removeInteraction(drawInteraction);
	map.removeInteraction(snapInteraction);
	addInteraction();
};
addInteraction();
//#endregion

//# sourceMappingURL=tracing.js.map