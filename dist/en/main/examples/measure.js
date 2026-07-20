import { $r as unByKey, Cn as OSM, Fn as Stroke, Gt as Draw, Ln as Fill, Mn as Map, Mr as getArea, Pn as Style, Pr as getLength, Rn as CircleStyle, at as Overlay, bn as VectorLayer, dn as VectorSource, fr as Polygon, gn as LineString, jn as TileLayer, or as View } from "./common.js";
//#region examples/measure.js
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource();
var vector = new VectorLayer({
	source,
	style: {
		"fill-color": "rgba(255, 255, 255, 0.2)",
		"stroke-color": "#ffcc33",
		"stroke-width": 2,
		"circle-radius": 7,
		"circle-fill-color": "#ffcc33"
	}
});
/**
* Currently drawn feature.
* @type {import('../src/ol/Feature.js').default}
*/
var sketch;
/**
* The help tooltip element.
* @type {HTMLElement}
*/
var helpTooltipElement;
/**
* Overlay to show the help messages.
* @type {Overlay}
*/
var helpTooltip;
/**
* The measure tooltip element.
* @type {HTMLElement}
*/
var measureTooltipElement;
/**
* Overlay to show the measurement.
* @type {Overlay}
*/
var measureTooltip;
/**
* Message to show when the user is drawing a polygon.
* @type {string}
*/
var continuePolygonMsg = "Click to continue drawing the polygon";
/**
* Message to show when the user is drawing a line.
* @type {string}
*/
var continueLineMsg = "Click to continue drawing the line";
/**
* Handle pointer move.
* @param {import('../src/ol/MapBrowserEvent').default} evt The event.
*/
var pointerMoveHandler = function(evt) {
	if (evt.dragging) return;
	/** @type {string} */
	let helpMsg = "Click to start drawing";
	if (sketch) {
		const geom = sketch.getGeometry();
		if (geom instanceof Polygon) helpMsg = continuePolygonMsg;
		else if (geom instanceof LineString) helpMsg = continueLineMsg;
	}
	helpTooltipElement.innerHTML = helpMsg;
	helpTooltip.setPosition(evt.coordinate);
	helpTooltipElement.classList.remove("hidden");
};
var map = new Map({
	layers: [raster, vector],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 15
	})
});
map.on("pointermove", pointerMoveHandler);
map.getViewport().addEventListener("mouseout", function() {
	helpTooltipElement.classList.add("hidden");
});
var typeSelect = document.getElementById("type");
var draw;
/**
* Format length output.
* @param {LineString} line The line.
* @return {string} The formatted length.
*/
var formatLength = function(line) {
	const length = getLength(line);
	let output;
	if (length > 100) output = Math.round(length / 1e3 * 100) / 100 + " km";
	else output = Math.round(length * 100) / 100 + " m";
	return output;
};
/**
* Format area output.
* @param {Polygon} polygon The polygon.
* @return {string} Formatted area.
*/
var formatArea = function(polygon) {
	const area = getArea(polygon);
	let output;
	if (area > 1e4) output = Math.round(area / 1e6 * 100) / 100 + " km<sup>2</sup>";
	else output = Math.round(area * 100) / 100 + " m<sup>2</sup>";
	return output;
};
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
function addInteraction() {
	const type = typeSelect.value == "area" ? "Polygon" : "LineString";
	draw = new Draw({
		source,
		type,
		style: function(feature) {
			const geometryType = feature.getGeometry().getType();
			if (geometryType === type || geometryType === "Point") return style;
		}
	});
	map.addInteraction(draw);
	createMeasureTooltip();
	createHelpTooltip();
	let listener;
	draw.on("drawstart", function(evt) {
		sketch = evt.feature;
		/** @type {import('../src/ol/coordinate.js').Coordinate|undefined} */
		let tooltipCoord;
		listener = sketch.getGeometry().on("change", function(evt) {
			const geom = evt.target;
			let output;
			if (geom instanceof Polygon) {
				output = formatArea(geom);
				tooltipCoord = geom.getInteriorPoint().getCoordinates();
			} else if (geom instanceof LineString) {
				output = formatLength(geom);
				tooltipCoord = geom.getLastCoordinate();
			}
			measureTooltipElement.innerHTML = output;
			measureTooltip.setPosition(tooltipCoord);
		});
	});
	draw.on("drawend", function() {
		measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
		measureTooltip.setOffset([0, -7]);
		sketch = null;
		measureTooltipElement = null;
		createMeasureTooltip();
		unByKey(listener);
	});
}
/**
* Creates a new help tooltip
*/
function createHelpTooltip() {
	if (helpTooltipElement) helpTooltipElement.remove();
	helpTooltipElement = document.createElement("div");
	helpTooltipElement.className = "ol-tooltip hidden";
	helpTooltip = new Overlay({
		element: helpTooltipElement,
		offset: [15, 0],
		positioning: "center-left"
	});
	map.addOverlay(helpTooltip);
}
/**
* Creates a new measure tooltip
*/
function createMeasureTooltip() {
	if (measureTooltipElement) measureTooltipElement.remove();
	measureTooltipElement = document.createElement("div");
	measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
	measureTooltip = new Overlay({
		element: measureTooltipElement,
		offset: [0, -15],
		positioning: "bottom-center",
		stopEvent: false,
		insertFirst: false
	});
	map.addOverlay(measureTooltip);
}
/**
* Let user change the geometry type.
*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	addInteraction();
};
addInteraction();
//#endregion

//# sourceMappingURL=measure.js.map