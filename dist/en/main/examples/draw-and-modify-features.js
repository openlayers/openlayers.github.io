import { Cn as OSM, G as Modify, Gt as Draw, Mn as Map, W as Snap, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, wr as get } from "./common.js";
//#region examples/draw-and-modify-features.js
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource();
var vector = new VectorLayer({
	source,
	style: {
		"fill-color": "rgba(255, 255, 255, 0.2)",
		"stroke-color": "#ffcc33",
		"stroke-width": 2,
		"circle-radius": 7,
		"circle-fill-color": "#ffcc33"
	}
});
var extent = get("EPSG:3857").getExtent().slice();
extent[0] += extent[0];
extent[2] += extent[2];
var map = new Map({
	layers: [raster, vector],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 4,
		extent
	})
});
var modify = new Modify({ source });
map.addInteraction(modify);
var draw;
var snap;
var typeSelect = document.getElementById("type");
function addInteractions() {
	draw = new Draw({
		source,
		type: typeSelect.value
	});
	map.addInteraction(draw);
	snap = new Snap({ source });
	map.addInteraction(snap);
}
/**
* Handle change event.
*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	map.removeInteraction(snap);
	addInteractions();
};
addInteractions();
//#endregion

//# sourceMappingURL=draw-and-modify-features.js.map