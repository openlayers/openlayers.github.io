import { Cn as OSM, Mn as Map, jn as TileLayer, or as View, ut as Geolocation } from "./common.js";
//#region examples/mobile-full-screen.js
var view = new View({
	center: [0, 0],
	zoom: 2
});
new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view
});
var geolocation = new Geolocation({
	projection: view.getProjection(),
	tracking: true
});
geolocation.once("change:position", function() {
	view.setCenter(geolocation.getPosition());
	view.setResolution(2.388657133911758);
});
//#endregion

//# sourceMappingURL=mobile-full-screen.js.map