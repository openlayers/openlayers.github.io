import { Cr as fromLonLat, Fn as Stroke, Ln as Fill, Mn as Map, Nn as Text, Pn as Style, bn as VectorLayer, dn as VectorSource, or as View, rn as GeoJSON } from "./common.js";
//#region examples/vector-label-decluttering.js
var map = new Map({
	target: "map",
	view: new View({
		center: fromLonLat([-100, 38.5]),
		zoom: 4
	})
});
var labelStyle = new Style({ text: new Text({
	font: "12px Calibri,sans-serif",
	overflow: true,
	fill: new Fill({ color: "#000" }),
	stroke: new Stroke({
		color: "#fff",
		width: 3
	})
}) });
var style = [new Style({
	fill: new Fill({ color: "rgba(255, 255, 255, 0.6)" }),
	stroke: new Stroke({
		color: "#319FD3",
		width: 1
	})
}), labelStyle];
var vectorLayer = new VectorLayer({
	background: "white",
	source: new VectorSource({
		url: "https://openlayers.org/data/vector/us-states.json",
		format: new GeoJSON()
	}),
	style: function(feature) {
		const label = feature.get("name").split(" ").join("\n");
		labelStyle.getText().setText(label);
		return style;
	},
	declutter: true
});
map.addLayer(vectorLayer);
//#endregion

//# sourceMappingURL=vector-label-decluttering.js.map