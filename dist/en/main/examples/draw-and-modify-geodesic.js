import { Cn as OSM, Fn as Stroke, G as Modify, Gt as Draw, Ln as Fill, Mn as Map, Nr as getDistance, Or as transform, Pn as Style, Rn as CircleStyle, W as Snap, bn as VectorLayer, dn as VectorSource, fr as Polygon, hr as Point, in as GeometryCollection, jn as TileLayer, or as View, pr as circular } from "./common.js";
//#region examples/draw-and-modify-geodesic.js
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource();
var style = new Style({
	fill: new Fill({ color: "rgba(255, 255, 255, 0.2)" }),
	stroke: new Stroke({
		color: "#33cc33",
		width: 2
	}),
	image: new CircleStyle({
		radius: 7,
		fill: new Fill({ color: "#ffcc33" })
	})
});
var geodesicStyle = new Style({
	geometry: function(feature) {
		return feature.get("modifyGeometry") || feature.getGeometry();
	},
	fill: new Fill({ color: "rgba(255, 255, 255, 0.2)" }),
	stroke: new Stroke({
		color: "#ff3333",
		width: 2
	}),
	image: new CircleStyle({
		radius: 7,
		fill: new Fill({ color: "rgba(0, 0, 0, 0)" })
	})
});
var map = new Map({
	layers: [raster, new VectorLayer({
		source,
		style: function(feature) {
			return feature.getGeometry().getType() === "GeometryCollection" ? geodesicStyle : style;
		}
	})],
	target: "map",
	view: new View({
		center: [-11e6, 66e5],
		zoom: 3
	})
});
var defaultStyle = new Modify({ source }).getOverlay().getStyleFunction();
var modify = new Modify({
	source,
	style: function(feature, resolution) {
		feature.get("features").forEach(function(modifyFeature) {
			const modifyGeometry = modifyFeature.get("modifyGeometry");
			if (modifyGeometry) {
				const modifyPoint = feature.getGeometry().getCoordinates();
				const geometries = modifyFeature.getGeometry().getGeometries();
				const polygon = geometries[0].getCoordinates()[0];
				const center = geometries[1].getCoordinates();
				const projection = map.getView().getProjection();
				let first, last, radius;
				if (modifyPoint[0] === center[0] && modifyPoint[1] === center[1]) {
					first = transform(polygon[0], projection, "EPSG:4326");
					last = transform(polygon[(polygon.length - 1) / 2], projection, "EPSG:4326");
					radius = getDistance(first, last) / 2;
				} else {
					first = transform(center, projection, "EPSG:4326");
					last = transform(modifyPoint, projection, "EPSG:4326");
					radius = getDistance(first, last);
				}
				const circle = circular(transform(center, projection, "EPSG:4326"), radius, 128);
				circle.transform("EPSG:4326", projection);
				geometries[0].setCoordinates(circle.getCoordinates());
				modifyGeometry.setGeometries(geometries);
			}
		});
		return defaultStyle(feature, resolution);
	}
});
modify.on("modifystart", function(event) {
	event.features.forEach(function(feature) {
		const geometry = feature.getGeometry();
		if (geometry.getType() === "GeometryCollection") feature.set("modifyGeometry", geometry.clone(), true);
	});
});
modify.on("modifyend", function(event) {
	event.features.forEach(function(feature) {
		const modifyGeometry = feature.get("modifyGeometry");
		if (modifyGeometry) {
			feature.setGeometry(modifyGeometry);
			feature.unset("modifyGeometry", true);
		}
	});
});
map.addInteraction(modify);
var draw;
var snap;
var typeSelect = document.getElementById("type");
function addInteractions() {
	let value = typeSelect.value;
	let geometryFunction;
	if (value === "Geodesic") {
		value = "Circle";
		geometryFunction = function(coordinates, geometry, projection) {
			if (!geometry) geometry = new GeometryCollection([new Polygon([]), new Point(coordinates[0])]);
			const geometries = geometry.getGeometries();
			const center = transform(coordinates[0], projection, "EPSG:4326");
			const circle = circular(center, getDistance(center, transform(coordinates[1], projection, "EPSG:4326")), 128);
			circle.transform("EPSG:4326", projection);
			geometries[0].setCoordinates(circle.getCoordinates());
			geometry.setGeometries(geometries);
			return geometry;
		};
	}
	draw = new Draw({
		source,
		type: value,
		geometryFunction
	});
	map.addInteraction(draw);
	snap = new Snap({ source });
	map.addInteraction(snap);
}
/**
* Handle change event.
*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	map.removeInteraction(snap);
	addInteractions();
};
addInteractions();
//#endregion

//# sourceMappingURL=draw-and-modify-geodesic.js.map