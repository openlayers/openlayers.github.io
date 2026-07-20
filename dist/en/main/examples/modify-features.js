import { Cr as fromLonLat, G as Modify, Mn as Map, Wn as defaults, bn as VectorLayer, dn as VectorSource, nn as Select, or as View, rn as GeoJSON } from "./common.js";
//#region examples/modify-features.js
var vector = new VectorLayer({
	background: "white",
	source: new VectorSource({
		url: "https://openlayers.org/data/vector/us-states.json",
		format: new GeoJSON(),
		wrapX: false
	})
});
var select = new Select();
var modify = new Modify({ features: select.getFeatures() });
new Map({
	interactions: defaults().extend([select, modify]),
	layers: [vector],
	target: "map",
	view: new View({
		center: fromLonLat([-100, 38.5]),
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=modify-features.js.map