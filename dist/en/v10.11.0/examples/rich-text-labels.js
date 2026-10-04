import { Fn as Stroke, Ln as Fill, Mn as Map, Nn as Text, Pn as Style, bn as VectorLayer, dn as VectorSource, or as View, rn as GeoJSON } from "./common.js";
//#region examples/rich-text-labels.js
var map = new Map({
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2,
		extent: [
			-13882269,
			2890586,
			-7456136,
			6340207
		],
		showFullExtent: true
	})
});
var labelStyle = new Style({ text: new Text({
	font: "13px Calibri,sans-serif",
	fill: new Fill({ color: "#000" }),
	stroke: new Stroke({
		color: "#fff",
		width: 4
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
		labelStyle.getText().setText([
			feature.getId(),
			"bold 13px Calibri,sans-serif",
			` ${feature.get("name")}`,
			"",
			"\n",
			"",
			`${feature.get("density")} people/mi²`,
			"italic 11px Calibri,sans-serif"
		]);
		return style;
	}
});
map.addLayer(vectorLayer);
//#endregion

//# sourceMappingURL=rich-text-labels.js.map