import { Ar as useGeographic, G as Modify, Gt as Draw, Mn as Map, W as Snap, bn as VectorLayer, dn as VectorSource, nn as Select, or as View, rn as GeoJSON } from "./common.js";
//#region examples/edit-geographic.js
useGeographic();
var source = new VectorSource({
	url: "https://openlayers.org/data/vector/us-states.json",
	format: new GeoJSON()
});
var map = new Map({
	target: "map",
	layers: [new VectorLayer({
		background: "white",
		source
	})],
	view: new View({
		center: [-100, 38.5],
		zoom: 4
	})
});
var select = new Select();
var modify = new Modify({ features: select.getFeatures() });
var draw = new Draw({
	type: "Polygon",
	source
});
var snap = new Snap({ source });
function removeInteractions() {
	map.removeInteraction(modify);
	map.removeInteraction(select);
	map.removeInteraction(draw);
	map.removeInteraction(select);
}
var mode = document.getElementById("mode");
function onChange() {
	removeInteractions();
	switch (mode.value) {
		case "draw":
			map.addInteraction(draw);
			map.addInteraction(snap);
			break;
		case "modify":
			map.addInteraction(select);
			map.addInteraction(modify);
			map.addInteraction(snap);
			break;
		default:
	}
}
mode.addEventListener("change", onChange);
onChange();
//#endregion

//# sourceMappingURL=edit-geographic.js.map