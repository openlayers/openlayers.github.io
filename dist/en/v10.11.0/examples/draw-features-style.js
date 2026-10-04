import { Cn as OSM, Gt as Draw, Mn as Map, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/draw-features-style.js
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource({ wrapX: false });
var map = new Map({
	layers: [raster, new VectorLayer({ source })],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 4
	})
});
var styles = {
	Point: {
		"circle-radius": 5,
		"circle-fill-color": "red"
	},
	LineString: {
		"circle-radius": 5,
		"circle-fill-color": "red",
		"stroke-color": "yellow",
		"stroke-width": 2
	},
	Polygon: {
		"circle-radius": 5,
		"circle-fill-color": "red",
		"stroke-color": "yellow",
		"stroke-width": 2,
		"fill-color": "blue"
	},
	Circle: {
		"circle-radius": 5,
		"circle-fill-color": "red",
		"stroke-color": "blue",
		"stroke-width": 2,
		"fill-color": "yellow"
	}
};
var typeSelect = document.getElementById("type");
var draw;
function addInteraction() {
	const value = typeSelect.value;
	if (value !== "None") {
		draw = new Draw({
			source,
			type: typeSelect.value,
			style: styles[value]
		});
		map.addInteraction(draw);
	}
}
/**
* Handle change event.
*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	addInteraction();
};
addInteraction();
//#endregion

//# sourceMappingURL=draw-features-style.js.map