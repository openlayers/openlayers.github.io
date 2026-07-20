import { C as OverviewMap, Cn as OSM, K as DragRotateAndZoom, Mn as Map, Wn as defaults$1, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/overviewmap-custom.js
var rotateWithView = document.getElementById("rotateWithView");
var overviewMapControl = new OverviewMap({
	className: "ol-overviewmap ol-custom-overviewmap",
	layers: [new TileLayer({ source: new OSM({ "url": "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0e6fc415256d4fbb9b5166a718591d71" }) })],
	collapseLabel: "»",
	label: "«",
	collapsed: false
});
rotateWithView.addEventListener("change", function() {
	overviewMapControl.setRotateWithView(this.checked);
});
new Map({
	controls: defaults().extend([overviewMapControl]),
	interactions: defaults$1().extend([new DragRotateAndZoom()]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [5e5, 6e6],
		zoom: 7
	})
});
//#endregion

//# sourceMappingURL=overviewmap-custom.js.map