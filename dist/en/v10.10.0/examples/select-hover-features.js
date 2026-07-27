import { Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, er as pointerMove, nn as Select, or as View, rn as GeoJSON } from "./common.js";
//#region examples/select-hover-features.js
var style = new Style({ fill: new Fill({ color: "#eeeeee" }) });
function colorStyle(style) {
	return function(f) {
		style.getFill().setColor(f.get("COLOR") || "#eeeeee");
		return style;
	};
}
var map = new Map({
	layers: [new VectorLayer({
		source: new VectorSource({
			url: "https://openlayers.org/data/vector/ecoregions.json",
			format: new GeoJSON()
		}),
		background: "white",
		style: colorStyle(style)
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var selectStyle = new Style({
	fill: new Fill({ color: "#eeeeee" }),
	stroke: new Stroke({
		color: "rgba(255, 255, 255, 0.7)",
		width: 2
	})
});
var status = document.getElementById("status");
var select = new Select({
	condition: pointerMove,
	style: colorStyle(selectStyle)
});
map.addInteraction(select);
select.on("select", function(e) {
	if (e.selected.length > 0) status.innerHTML = e.selected[0].get("ECO_NAME");
	else status.innerHTML = "&nbsp;";
});
//#endregion

//# sourceMappingURL=select-hover-features.js.map