import { Cn as OSM, G as Modify, Gt as Draw, Mn as Map, W as Snap, bn as VectorLayer, dn as VectorSource, jn as TileLayer, nn as Select, or as View } from "./common.js";
//#region examples/snap.js
var raster = new TileLayer({ source: new OSM() });
var vector = new VectorLayer({
	source: new VectorSource(),
	style: {
		"fill-color": "rgba(255, 255, 255, 0.2)",
		"stroke-color": "#ffcc33",
		"stroke-width": 2,
		"circle-radius": 7,
		"circle-fill-color": "#ffcc33"
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
var ExampleModify = {
	init: function() {
		this.select = new Select();
		map.addInteraction(this.select);
		this.modify = new Modify({ features: this.select.getFeatures() });
		map.addInteraction(this.modify);
		this.setEvents();
	},
	setEvents: function() {
		const selectedFeatures = this.select.getFeatures();
		this.select.on("change:active", function() {
			selectedFeatures.forEach(function(each) {
				selectedFeatures.remove(each);
			});
		});
	},
	setActive: function(active) {
		this.select.setActive(active);
		this.modify.setActive(active);
	}
};
ExampleModify.init();
var optionsForm = document.getElementById("options-form");
var ExampleDraw = {
	init: function() {
		map.addInteraction(this.Point);
		this.Point.setActive(false);
		map.addInteraction(this.LineString);
		this.LineString.setActive(false);
		map.addInteraction(this.Polygon);
		this.Polygon.setActive(false);
		map.addInteraction(this.Circle);
		this.Circle.setActive(false);
	},
	Point: new Draw({
		source: vector.getSource(),
		type: "Point"
	}),
	LineString: new Draw({
		source: vector.getSource(),
		type: "LineString"
	}),
	Polygon: new Draw({
		source: vector.getSource(),
		type: "Polygon"
	}),
	Circle: new Draw({
		source: vector.getSource(),
		type: "Circle"
	}),
	activeDraw: null,
	setActive: function(active) {
		if (this.activeDraw) {
			this.activeDraw.setActive(false);
			this.activeDraw = null;
		}
		if (active) {
			const type = optionsForm.elements["draw-type"].value;
			this.activeDraw = this[type];
			this.activeDraw.setActive(true);
		}
	}
};
ExampleDraw.init();
/**
* Let user change the geometry type.
* @param {Event} e Change event.
*/
optionsForm.onchange = function(e) {
	const type = e.target.getAttribute("name");
	if (type == "draw-type") {
		ExampleModify.setActive(false);
		ExampleDraw.setActive(true);
		optionsForm.elements["interaction"].value = "draw";
	} else if (type == "interaction") {
		const interactionType = e.target.value;
		if (interactionType == "modify") {
			ExampleDraw.setActive(false);
			ExampleModify.setActive(true);
		} else if (interactionType == "draw") {
			ExampleDraw.setActive(true);
			ExampleModify.setActive(false);
		}
	}
};
ExampleDraw.setActive(true);
ExampleModify.setActive(false);
var snap = new Snap({
	source: vector.getSource(),
	intersection: true
});
var snappedElement = document.getElementById("snapped");
snap.on("snap", () => {
	document.getElementById("map").style.cursor = "grabbing";
	snappedElement.innerHTML = "Snapped: true";
});
snap.on("unsnap", () => {
	document.getElementById("map").style.cursor = "default";
	snappedElement.innerHTML = "Snapped: false";
});
map.addInteraction(snap);
//#endregion

//# sourceMappingURL=snap.js.map