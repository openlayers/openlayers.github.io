import { Cn as OSM, Fn as Stroke, G as Modify, Gt as Draw, Ln as Fill, Mn as Map, Mr as getArea, Nn as Text, Pn as Style, Pr as getLength, Rn as CircleStyle, bn as VectorLayer, dn as VectorSource, gn as LineString, hr as Point, jn as TileLayer, or as View, zn as RegularShape } from "./common.js";
//#region examples/measure-style.js
var typeSelect = document.getElementById("type");
var showSegments = document.getElementById("segments");
var clearPrevious = document.getElementById("clear");
var style = new Style({
	fill: new Fill({ color: "rgba(255, 255, 255, 0.2)" }),
	stroke: new Stroke({
		color: "rgba(0, 0, 0, 0.5)",
		lineDash: [10, 10],
		width: 2
	}),
	image: new CircleStyle({
		radius: 5,
		stroke: new Stroke({ color: "rgba(0, 0, 0, 0.7)" }),
		fill: new Fill({ color: "rgba(255, 255, 255, 0.2)" })
	})
});
var labelStyle = new Style({
	text: new Text({
		font: "14px Calibri,sans-serif",
		fill: new Fill({ color: "rgba(255, 255, 255, 1)" }),
		backgroundFill: new Fill({ color: "rgba(0, 0, 0, 0.7)" }),
		padding: [
			3,
			3,
			3,
			3
		],
		textBaseline: "bottom",
		offsetY: -15
	}),
	image: new RegularShape({
		radius: 8,
		points: 3,
		angle: Math.PI,
		displacement: [0, 10],
		fill: new Fill({ color: "rgba(0, 0, 0, 0.7)" })
	})
});
var tipStyle = new Style({ text: new Text({
	font: "12px Calibri,sans-serif",
	fill: new Fill({ color: "rgba(255, 255, 255, 1)" }),
	backgroundFill: new Fill({ color: "rgba(0, 0, 0, 0.4)" }),
	padding: [
		2,
		2,
		2,
		2
	],
	textAlign: "left",
	offsetX: 15
}) });
var modifyStyle = new Style({
	image: new CircleStyle({
		radius: 5,
		stroke: new Stroke({ color: "rgba(0, 0, 0, 0.7)" }),
		fill: new Fill({ color: "rgba(0, 0, 0, 0.4)" })
	}),
	text: new Text({
		text: "Drag to modify",
		font: "12px Calibri,sans-serif",
		fill: new Fill({ color: "rgba(255, 255, 255, 1)" }),
		backgroundFill: new Fill({ color: "rgba(0, 0, 0, 0.7)" }),
		padding: [
			2,
			2,
			2,
			2
		],
		textAlign: "left",
		offsetX: 15
	})
});
var segmentStyle = new Style({
	text: new Text({
		font: "12px Calibri,sans-serif",
		fill: new Fill({ color: "rgba(255, 255, 255, 1)" }),
		backgroundFill: new Fill({ color: "rgba(0, 0, 0, 0.4)" }),
		padding: [
			2,
			2,
			2,
			2
		],
		textBaseline: "bottom",
		offsetY: -12
	}),
	image: new RegularShape({
		radius: 6,
		points: 3,
		angle: Math.PI,
		displacement: [0, 8],
		fill: new Fill({ color: "rgba(0, 0, 0, 0.4)" })
	})
});
var segmentStyles = [segmentStyle];
var formatLength = function(line) {
	const length = getLength(line);
	let output;
	if (length > 100) output = Math.round(length / 1e3 * 100) / 100 + " km";
	else output = Math.round(length * 100) / 100 + " m";
	return output;
};
var formatArea = function(polygon) {
	const area = getArea(polygon);
	let output;
	if (area > 1e4) output = Math.round(area / 1e6 * 100) / 100 + " km²";
	else output = Math.round(area * 100) / 100 + " m²";
	return output;
};
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource();
var modify = new Modify({
	source,
	style: modifyStyle
});
var tipPoint;
function styleFunction(feature, segments, drawType, tip) {
	const styles = [];
	const geometry = feature.getGeometry();
	const type = geometry.getType();
	let point, label, line;
	if (!drawType || drawType === type || type === "Point") {
		styles.push(style);
		if (type === "Polygon") {
			point = geometry.getInteriorPoint();
			label = formatArea(geometry);
			line = new LineString(geometry.getCoordinates()[0]);
		} else if (type === "LineString") {
			point = new Point(geometry.getLastCoordinate());
			label = formatLength(geometry);
			line = geometry;
		}
	}
	if (segments && line) {
		let count = 0;
		line.forEachSegment(function(a, b) {
			const segment = new LineString([a, b]);
			const label = formatLength(segment);
			if (segmentStyles.length - 1 < count) segmentStyles.push(segmentStyle.clone());
			const segmentPoint = new Point(segment.getCoordinateAt(.5));
			segmentStyles[count].setGeometry(segmentPoint);
			segmentStyles[count].getText().setText(label);
			styles.push(segmentStyles[count]);
			count++;
		});
	}
	if (label) {
		labelStyle.setGeometry(point);
		labelStyle.getText().setText(label);
		styles.push(labelStyle);
	}
	if (tip && type === "Point" && !modify.getOverlay().getSource().getFeatures().length) {
		tipPoint = geometry;
		tipStyle.getText().setText(tip);
		styles.push(tipStyle);
	}
	return styles;
}
var vector = new VectorLayer({
	source,
	style: function(feature) {
		return styleFunction(feature, showSegments.checked);
	}
});
var map = new Map({
	layers: [raster, vector],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 15
	})
});
map.addInteraction(modify);
var draw;
function addInteraction() {
	const drawType = typeSelect.value;
	const activeTip = "Click to continue drawing the " + (drawType === "Polygon" ? "polygon" : "line");
	const idleTip = "Click to start measuring";
	let tip = idleTip;
	draw = new Draw({
		source,
		type: drawType,
		style: function(feature) {
			return styleFunction(feature, showSegments.checked, drawType, tip);
		}
	});
	draw.on("drawstart", function() {
		if (clearPrevious.checked) source.clear();
		modify.setActive(false);
		tip = activeTip;
	});
	draw.on("drawend", function() {
		modifyStyle.setGeometry(tipPoint);
		modify.setActive(true);
		map.once("pointermove", function() {
			modifyStyle.setGeometry(null);
		});
		tip = idleTip;
	});
	modify.setActive(true);
	map.addInteraction(draw);
}
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	addInteraction();
};
addInteraction();
showSegments.onchange = function() {
	vector.changed();
	draw.getOverlay().changed();
};
//#endregion

//# sourceMappingURL=measure-style.js.map