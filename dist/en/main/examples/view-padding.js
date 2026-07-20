import { Cn as OSM, Cr as fromLonLat, Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON } from "./common.js";
//#region examples/view-padding.js
/** @type {VectorSource<import('../src/ol/Feature.js').default<import('../src/ol/geom/SimpleGeometry.js').default>>} */
var source = new VectorSource({
	url: "data/geojson/switzerland.geojson",
	format: new GeoJSON()
});
var vectorLayer = new VectorLayer({
	source,
	style: new Style({
		fill: new Fill({ color: "rgba(255, 255, 255, 0.6)" }),
		stroke: new Stroke({
			color: "#319FD3",
			width: 1
		}),
		image: new CircleStyle({
			radius: 5,
			fill: new Fill({ color: "rgba(255, 255, 255, 0.6)" }),
			stroke: new Stroke({
				color: "#319FD3",
				width: 1
			})
		})
	})
});
var view = new View({
	center: fromLonLat([6.6339863, 46.5193823]),
	padding: [
		170,
		50,
		30,
		150
	],
	zoom: 6
});
new Map({
	layers: [new TileLayer({ source: new OSM() }), vectorLayer],
	target: "map",
	view
});
vectorLayer.getSource().on("featuresloadend", function() {
	document.getElementById("zoomtoswitzerland").addEventListener("click", function() {
		const polygon = source.getFeatures()[0].getGeometry();
		view.fit(polygon);
	}, false);
	document.getElementById("centerlausanne").addEventListener("click", function() {
		const point = source.getFeatures()[1].getGeometry();
		view.setCenter(point.getCoordinates());
	}, false);
});
//#endregion

//# sourceMappingURL=view-padding.js.map