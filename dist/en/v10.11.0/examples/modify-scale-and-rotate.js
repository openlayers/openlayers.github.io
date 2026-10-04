import { $n as platformModifierKeyOnly, Cn as OSM, D as Translate, Fn as Stroke, G as Modify, Gr as getCenter, Gt as Draw, Kr as getHeight, Ln as Fill, Mn as Map, Pn as Style, Qn as never, Rn as CircleStyle, Yr as getWidth, bn as VectorLayer, dn as VectorSource, hr as Point, jn as TileLayer, mn as MultiPoint, or as View, tr as primaryAction } from "./common.js";
//#region examples/modify-scale-and-rotate.js
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource();
var style = new Style({
	geometry: function(feature) {
		const modifyGeometry = feature.get("modifyGeometry");
		return modifyGeometry ? modifyGeometry.geometry : feature.getGeometry();
	},
	fill: new Fill({ color: "rgba(255, 255, 255, 0.2)" }),
	stroke: new Stroke({
		color: "#ffcc33",
		width: 2
	}),
	image: new CircleStyle({
		radius: 7,
		fill: new Fill({ color: "#ffcc33" })
	})
});
function calculateCenter(geometry) {
	let center, coordinates, minRadius;
	const type = geometry.getType();
	if (type === "Polygon") {
		let x = 0;
		let y = 0;
		let i = 0;
		coordinates = geometry.getCoordinates()[0].slice(1);
		coordinates.forEach(function(coordinate) {
			x += coordinate[0];
			y += coordinate[1];
			i++;
		});
		center = [x / i, y / i];
	} else if (type === "LineString") {
		center = geometry.getCoordinateAt(.5);
		coordinates = geometry.getCoordinates();
	} else center = getCenter(geometry.getExtent());
	let sqDistances;
	if (coordinates) {
		sqDistances = coordinates.map(function(coordinate) {
			const dx = coordinate[0] - center[0];
			const dy = coordinate[1] - center[1];
			return dx * dx + dy * dy;
		});
		minRadius = Math.sqrt(Math.max.apply(Math, sqDistances)) / 3;
	} else minRadius = Math.max(getWidth(geometry.getExtent()), getHeight(geometry.getExtent())) / 3;
	return {
		center,
		coordinates,
		minRadius,
		sqDistances
	};
}
var vector = new VectorLayer({
	source,
	style: function(feature) {
		const styles = [style];
		const modifyGeometry = feature.get("modifyGeometry");
		const result = calculateCenter(modifyGeometry ? modifyGeometry.geometry : feature.getGeometry());
		const center = result.center;
		if (center) {
			styles.push(new Style({
				geometry: new Point(center),
				image: new CircleStyle({
					radius: 4,
					fill: new Fill({ color: "#ff3333" })
				})
			}));
			const coordinates = result.coordinates;
			if (coordinates) {
				const minRadius = result.minRadius;
				const sqDistances = result.sqDistances;
				const rsq = minRadius * minRadius;
				const points = coordinates.filter(function(coordinate, index) {
					return sqDistances[index] > rsq;
				});
				styles.push(new Style({
					geometry: new MultiPoint(points),
					image: new CircleStyle({
						radius: 4,
						fill: new Fill({ color: "#33cc33" })
					})
				}));
			}
		}
		return styles;
	}
});
var map = new Map({
	layers: [raster, vector],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 4
	})
});
var defaultStyle = new Modify({ source }).getOverlay().getStyleFunction();
var modify = new Modify({
	source,
	condition: function(event) {
		return primaryAction(event) && !platformModifierKeyOnly(event);
	},
	deleteCondition: never,
	insertVertexCondition: never,
	style: function(feature, resolution) {
		feature.get("features").forEach(function(modifyFeature) {
			const modifyGeometry = modifyFeature.get("modifyGeometry");
			if (modifyGeometry) {
				const point = feature.getGeometry().getCoordinates();
				let modifyPoint = modifyGeometry.point;
				if (!modifyPoint) {
					modifyPoint = point;
					modifyGeometry.point = modifyPoint;
					modifyGeometry.geometry0 = modifyGeometry.geometry;
					const result = calculateCenter(modifyGeometry.geometry0);
					modifyGeometry.center = result.center;
					modifyGeometry.minRadius = result.minRadius;
				}
				const center = modifyGeometry.center;
				const minRadius = modifyGeometry.minRadius;
				let dx, dy;
				dx = modifyPoint[0] - center[0];
				dy = modifyPoint[1] - center[1];
				const initialRadius = Math.sqrt(dx * dx + dy * dy);
				if (initialRadius > minRadius) {
					const initialAngle = Math.atan2(dy, dx);
					dx = point[0] - center[0];
					dy = point[1] - center[1];
					const currentRadius = Math.sqrt(dx * dx + dy * dy);
					if (currentRadius > 0) {
						const currentAngle = Math.atan2(dy, dx);
						const geometry = modifyGeometry.geometry0.clone();
						geometry.scale(currentRadius / initialRadius, void 0, center);
						geometry.rotate(currentAngle - initialAngle, center);
						modifyGeometry.geometry = geometry;
					}
				}
			}
		});
		return defaultStyle(feature, resolution);
	}
});
modify.on("modifystart", function(event) {
	event.features.forEach(function(feature) {
		feature.set("modifyGeometry", { geometry: feature.getGeometry().clone() }, true);
	});
});
modify.on("modifyend", function(event) {
	event.features.forEach(function(feature) {
		const modifyGeometry = feature.get("modifyGeometry");
		if (modifyGeometry) {
			feature.setGeometry(modifyGeometry.geometry);
			feature.unset("modifyGeometry", true);
		}
	});
});
map.addInteraction(modify);
map.addInteraction(new Translate({
	condition: function(event) {
		return primaryAction(event) && platformModifierKeyOnly(event);
	},
	layers: [vector]
}));
var draw;
var typeSelect = document.getElementById("type");
function addInteractions() {
	draw = new Draw({
		source,
		type: typeSelect.value
	});
	map.addInteraction(draw);
}
/**
* Handle change event.
*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	addInteractions();
};
addInteractions();
//#endregion

//# sourceMappingURL=modify-scale-and-rotate.js.map