import { Cn as OSM, Fn as Stroke, Gt as Draw, In as Icon, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/icon-repeat.js
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource();
new Map({
	layers: [raster, new VectorLayer({
		source,
		style: new Style({
			stroke: new Stroke({
				color: "#ffcc33",
				width: 2
			}),
			image: new Icon({
				src: "data/arrow.png",
				rotateWithView: true,
				placement: "line",
				repeat: 50
			})
		})
	})],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 4
	})
}).addInteraction(new Draw({
	source,
	type: "LineString"
}));
//#endregion

//# sourceMappingURL=icon-repeat.js.map