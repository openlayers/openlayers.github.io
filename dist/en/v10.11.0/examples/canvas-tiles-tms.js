import { $t as VectorTileLayer, Fn as Stroke, Ln as Fill, Mn as Map, Nn as Text, Pn as Style, Qt as TileDebug, Zt as VectorTile, en as MVT, jn as TileLayer, or as View } from "./common.js";
//#region examples/canvas-tiles-tms.js
var style = new Style({
	fill: new Fill({ color: "rgba(255, 255, 255, 0.6)" }),
	stroke: new Stroke({
		color: "#319FD3",
		width: 1
	}),
	text: new Text({
		font: "12px Calibri,sans-serif",
		fill: new Fill({ color: "#000" }),
		stroke: new Stroke({
			color: "#fff",
			width: 3
		})
	})
});
var vtLayer = new VectorTileLayer({
	declutter: true,
	source: new VectorTile({
		maxZoom: 15,
		format: new MVT(),
		url: "https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf"
	}),
	style: function(feature) {
		style.getText().setText(feature.get("name"));
		return style;
	}
});
new Map({
	layers: [vtLayer, new TileLayer({ source: new TileDebug({
		template: "z:{z} x:{x} y:{-y}",
		projection: vtLayer.getSource().getProjection(),
		tileGrid: vtLayer.getSource().getTileGrid(),
		zDirection: 1
	}) })],
	target: "map",
	view: new View({
		center: [0, 6e6],
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=canvas-tiles-tms.js.map