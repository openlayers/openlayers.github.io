import { Cr as fromLonLat, D as Translate, Mn as Map, Wn as defaults, bn as VectorLayer, dn as VectorSource, nn as Select, or as View, rn as GeoJSON } from "./common.js";
//#region examples/translate-features.js
var vector = new VectorLayer({
	background: "white",
	source: new VectorSource({
		url: "https://openlayers.org/data/vector/us-states.json",
		format: new GeoJSON()
	})
});
var select = new Select();
var translate = new Translate({ features: select.getFeatures() });
new Map({
	interactions: defaults().extend([select, translate]),
	layers: [vector],
	target: "map",
	view: new View({
		center: fromLonLat([-100, 38.5]),
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=translate-features.js.map