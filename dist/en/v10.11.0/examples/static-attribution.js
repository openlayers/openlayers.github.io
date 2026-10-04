import { Cn as OSM, Mn as Map, ir as Attribution, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/static-attribution.js
var attribution = new Attribution({
	collapsible: false,
	attributions: `<a href="https://openlayers.org">I'm a static attribution. I never disappear</a>`
});
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	controls: defaults({ attribution: false }).extend([attribution]),
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
document.getElementById("toggleLayerButton").addEventListener("click", () => {
	map.getLayers().forEach((l) => {
		l.setVisible(l.getVisible() ? false : true);
	});
});
//#endregion

//# sourceMappingURL=static-attribution.js.map