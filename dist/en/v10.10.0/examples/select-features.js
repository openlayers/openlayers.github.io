import { Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, Qn as never, Yn as altKeyOnly, Zn as click, bn as VectorLayer, dn as VectorSource, er as pointerMove, nn as Select, or as View, rn as GeoJSON } from "./common.js";
//#region examples/select-features.js
var style = new Style({ fill: new Fill({ color: "#eeeeee" }) });
var map = new Map({
	layers: [new VectorLayer({
		source: new VectorSource({
			url: "https://openlayers.org/data/vector/ecoregions.json",
			format: new GeoJSON()
		}),
		background: "white",
		style: function(feature) {
			const color = feature.get("COLOR") || "#eeeeee";
			style.getFill().setColor(color);
			return style;
		}
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var select = null;
var selected = new Style({
	fill: new Fill({ color: "#eeeeee" }),
	stroke: new Stroke({
		color: "rgba(255, 255, 255, 0.7)",
		width: 2
	})
});
function selectStyle(feature) {
	const color = feature.get("COLOR") || "#eeeeee";
	selected.getFill().setColor(color);
	return selected;
}
var selectSingleClick = new Select({ style: selectStyle });
var selectClick = new Select({
	condition: click,
	style: selectStyle
});
var selectPointerMove = new Select({
	condition: pointerMove,
	toggleCondition: never,
	style: selectStyle
});
var selectAltClick = new Select({
	style: selectStyle,
	condition: function(mapBrowserEvent) {
		return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent);
	}
});
var selectElement = document.getElementById("type");
var changeInteraction = function() {
	if (select !== null) map.removeInteraction(select);
	const value = selectElement.value;
	if (value == "singleclick") select = selectSingleClick;
	else if (value == "click") select = selectClick;
	else if (value == "pointermove") select = selectPointerMove;
	else if (value == "altclick") select = selectAltClick;
	else select = null;
	if (select !== null) {
		map.addInteraction(select);
		select.on("select", function(e) {
			document.getElementById("status").innerHTML = "&nbsp;" + e.target.getFeatures().getLength() + " selected features (last operation selected " + e.selected.length + " and deselected " + e.deselected.length + " features)";
		});
	}
};
/**
* onchange callback on the select element.
*/
selectElement.onchange = changeInteraction;
changeInteraction();
//#endregion

//# sourceMappingURL=select-features.js.map