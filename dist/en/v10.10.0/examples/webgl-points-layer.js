import { Cn as OSM, F as WebGLVectorLayer, Mn as Map, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON } from "./common.js";
//#region examples/webgl-points-layer.js
var vectorSource = new VectorSource({
	url: "data/geojson/world-cities.geojson",
	format: new GeoJSON(),
	wrapX: true
});
var predefinedStyles = {
	icons: {
		"icon-src": "data/icon.png",
		"icon-width": 18,
		"icon-height": 28,
		"icon-color": "lightyellow",
		"icon-rotate-with-view": false,
		"icon-displacement": [0, 9]
	},
	triangles: {
		"shape-points": 3,
		"shape-radius": 9,
		"shape-fill-color": [
			"interpolate",
			["linear"],
			["get", "population"],
			2e4,
			"#5aca5b",
			3e5,
			"#ff6a19"
		],
		"shape-rotate-with-view": true
	},
	"triangles-latitude": {
		"shape-points": 3,
		"shape-radius": [
			"interpolate",
			["linear"],
			["get", "population"],
			4e4,
			6,
			2e6,
			12
		],
		"shape-fill-color": [
			"interpolate",
			["linear"],
			["get", "latitude"],
			-60,
			"#ff14c3",
			-20,
			"#ff621d",
			20,
			"#ffed02",
			60,
			"#00ff67"
		],
		"shape-opacity": .95
	},
	circles: {
		"circle-radius": [
			"interpolate",
			["linear"],
			["get", "population"],
			4e4,
			4,
			2e6,
			14
		],
		"circle-fill-color": [
			"match",
			["get", "hover"],
			1,
			"#ff3f3f",
			"#006688"
		],
		"circle-rotate-with-view": false,
		"circle-displacement": [0, 0],
		"circle-opacity": [
			"interpolate",
			["linear"],
			["get", "population"],
			4e4,
			.6,
			2e6,
			.92
		]
	},
	"circles-text": {
		"text-value": ["get", "city"],
		"text-font": "bold 11px \"Open Sans\", \"Arial Unicode MS\", sans-serif",
		"text-fill-color": "#334",
		"text-stroke-color": "rgba(255,255,255,0.8)",
		"text-stroke-width": 2,
		"text-offset-y": -12,
		"circle-radius": 4,
		"circle-fill-color": [
			"match",
			["get", "hover"],
			1,
			"#ff3f3f",
			"#006688"
		],
		"circle-rotate-with-view": false
	},
	"circles-zoom": {
		"circle-radius": [
			"interpolate",
			["exponential", 2],
			["zoom"],
			5,
			1.5,
			15,
			1.5 * Math.pow(2, 10)
		],
		"circle-fill-color": [
			"match",
			["get", "hover"],
			1,
			"#ff3f3f",
			"#006688"
		],
		"circle-displacement": [0, 0],
		"circle-opacity": .95
	},
	"rotating-bars": {
		"shape-rotation": [
			"*",
			["time"],
			.13
		],
		"shape-points": 4,
		"shape-radius": 4,
		"shape-radius2": 4 * Math.sqrt(2),
		"shape-scale": [
			"array",
			1,
			[
				"interpolate",
				["linear"],
				["get", "population"],
				2e4,
				1,
				3e5,
				7
			]
		],
		"shape-fill-color": [
			"interpolate",
			["linear"],
			["get", "population"],
			2e4,
			"#ffdc00",
			3e5,
			"#ff5b19"
		],
		"shape-displacement": [
			"array",
			0,
			[
				"interpolate",
				["linear"],
				["get", "population"],
				2e4,
				2,
				3e5,
				14
			]
		]
	}
};
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: document.getElementById("map"),
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var literalStyle;
var pointsLayer;
var selected = null;
map.on("pointermove", function(ev) {
	if (selected !== null) {
		selected.set("hover", 0);
		selected = null;
	}
	map.forEachFeatureAtPixel(ev.pixel, function(feature) {
		feature.set("hover", 1);
		selected = feature;
		return true;
	});
});
function refreshLayer(newStyle) {
	const previousLayer = pointsLayer;
	pointsLayer = new WebGLVectorLayer({
		source: vectorSource,
		style: newStyle
	});
	map.addLayer(pointsLayer);
	if (previousLayer) {
		map.removeLayer(previousLayer);
		previousLayer.dispose();
	}
	literalStyle = newStyle;
}
var spanValid = document.getElementById("style-valid");
var spanInvalid = document.getElementById("style-invalid");
function setStyleStatus(errorMsg) {
	const isError = typeof errorMsg === "string";
	spanValid.style.display = errorMsg === null ? "initial" : "none";
	spanInvalid.firstElementChild.innerText = isError ? errorMsg : "";
	spanInvalid.style.display = isError ? "initial" : "none";
}
var editor = document.getElementById("style-editor");
editor.addEventListener("input", function() {
	const textStyle = editor.value;
	try {
		const newLiteralStyle = JSON.parse(textStyle);
		if (JSON.stringify(newLiteralStyle) !== JSON.stringify(literalStyle)) refreshLayer(newLiteralStyle);
		setStyleStatus(null);
	} catch (e) {
		setStyleStatus(e.message);
	}
});
var select = document.getElementById("style-select");
select.value = "circles";
function onSelectChange() {
	const newLiteralStyle = predefinedStyles[select.value];
	editor.value = JSON.stringify(newLiteralStyle, null, 2);
	try {
		refreshLayer(newLiteralStyle);
		setStyleStatus();
	} catch (e) {
		setStyleStatus(e.message);
	}
}
onSelectChange();
select.addEventListener("change", onSelectChange);
function animate() {
	map.render();
	window.requestAnimationFrame(animate);
}
animate();
//#endregion

//# sourceMappingURL=webgl-points-layer.js.map