import { $n as platformModifierKeyOnly, Fn as Stroke, Kn as DragBox, Ln as Fill, Mn as Map, Pn as Style, Yr as getWidth, bn as VectorLayer, dn as VectorSource, nn as Select, or as View, rn as GeoJSON } from "./common.js";
//#region examples/box-selection.js
var vectorSource = new VectorSource({
	url: "https://openlayers.org/data/vector/ecoregions.json",
	format: new GeoJSON()
});
var style = new Style({ fill: new Fill({ color: "#eeeeee" }) });
var map = new Map({
	layers: [new VectorLayer({
		source: vectorSource,
		background: "#1a2b39",
		style: function(feature) {
			const color = feature.get("COLOR_BIO") || "#eeeeee";
			style.getFill().setColor(color);
			return style;
		}
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2,
		constrainRotation: 16
	})
});
var selectedStyle = new Style({
	fill: new Fill({ color: "rgba(255, 255, 255, 0.6)" }),
	stroke: new Stroke({
		color: "rgba(255, 255, 255, 0.7)",
		width: 2
	})
});
var select = new Select({
	filter: function(feature) {
		return !(feature.get("COLOR_BIO") === "#CC6767");
	},
	style: function(feature) {
		const color = feature.get("COLOR_BIO") || "#eeeeee";
		selectedStyle.getFill().setColor(color);
		return selectedStyle;
	}
});
map.addInteraction(select);
var dragBox = new DragBox({ condition: platformModifierKeyOnly });
map.addInteraction(dragBox);
dragBox.on("boxend", function() {
	const boxExtent = dragBox.getGeometry().getExtent();
	const worldExtent = map.getView().getProjection().getExtent();
	const worldWidth = getWidth(worldExtent);
	const startWorld = Math.floor((boxExtent[0] - worldExtent[0]) / worldWidth);
	const endWorld = Math.floor((boxExtent[2] - worldExtent[0]) / worldWidth);
	for (let world = startWorld; world <= endWorld; ++world) {
		const left = Math.max(boxExtent[0] - world * worldWidth, worldExtent[0]);
		const right = Math.min(boxExtent[2] - world * worldWidth, worldExtent[2]);
		const extent = [
			left,
			boxExtent[1],
			right,
			boxExtent[3]
		];
		const boxFeatures = vectorSource.getFeaturesInExtent(extent).filter((feature) => feature.getGeometry().intersectsExtent(extent));
		const rotation = map.getView().getRotation();
		if (rotation % (Math.PI / 2) !== 0) {
			const anchor = [0, 0];
			const geometry = dragBox.getGeometry().clone();
			geometry.translate(-world * worldWidth, 0);
			geometry.rotate(-rotation, anchor);
			const extent = geometry.getExtent();
			boxFeatures.forEach(function(feature) {
				const geometry = feature.getGeometry().clone();
				geometry.rotate(-rotation, anchor);
				if (geometry.intersectsExtent(extent)) select.selectFeature(feature);
			});
		} else boxFeatures.forEach(select.selectFeature.bind(select));
	}
});
dragBox.on("boxstart", function() {
	select.clearSelection();
});
var infoBox = document.getElementById("info");
select.on("select", function() {
	const names = select.getFeatures().getArray().map((feature) => {
		return feature.get("ECO_NAME");
	});
	if (names.length > 0) infoBox.innerHTML = names.join(", ");
	else infoBox.innerHTML = "None";
});
//#endregion

//# sourceMappingURL=box-selection.js.map