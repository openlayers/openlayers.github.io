import { Cn as OSM, Mn as Map, ir as Attribution, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/attributions.js
var attribution = new Attribution({ collapsible: false });
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	controls: defaults({ attribution: false }).extend([attribution]),
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
function checkSize() {
	const small = map.getSize()[0] < 600;
	attribution.setCollapsible(small);
	attribution.setCollapsed(small);
}
map.on("change:size", checkSize);
checkSize();
//#endregion

//# sourceMappingURL=attributions.js.map