import { Cr as fromLonLat, F as WebGLVectorLayer, Mn as Map, dn as VectorSource, hr as Point, jn as TileLayer, or as View, xn as Feature, yn as StadiaMaps } from "./common.js";
//#region examples/filter-points-webgl.js
var vectorSource = new VectorSource({ attributions: "NASA" });
var oldColor = "rgba(242,56,22,0.61)";
var newColor = "#ffe52c";
var period = 12;
var animRatio = [
	"^",
	[
		"/",
		[
			"%",
			[
				"+",
				["time"],
				[
					"interpolate",
					["linear"],
					["get", "year"],
					1850,
					0,
					2015,
					period
				]
			],
			period
		],
		period
	],
	.5
];
var style = {
	"circle-radius": [
		"*",
		[
			"interpolate",
			["linear"],
			["get", "mass"],
			0,
			4,
			2e5,
			13
		],
		[
			"-",
			1.75,
			[
				"*",
				animRatio,
				.75
			]
		]
	],
	"circle-fill-color": [
		"interpolate",
		["linear"],
		animRatio,
		0,
		newColor,
		1,
		oldColor
	],
	"circle-opacity": [
		"-",
		1,
		[
			"*",
			animRatio,
			.75
		]
	]
};
var minYearInput = document.getElementById("min-year");
var maxYearInput = document.getElementById("max-year");
function updateStatusText() {
	const div = document.getElementById("status");
	div.querySelector("span.min-year").textContent = minYearInput.value;
	div.querySelector("span.max-year").textContent = maxYearInput.value;
}
var pointsLayer = new WebGLVectorLayer({
	variables: {
		minYear: parseInt(minYearInput.value),
		maxYear: parseInt(maxYearInput.value)
	},
	style: [{
		style,
		filter: [
			"between",
			["get", "year"],
			["var", "minYear"],
			["var", "maxYear"]
		]
	}],
	source: vectorSource,
	disableHitDetection: true
});
minYearInput.addEventListener("input", function() {
	pointsLayer.updateStyleVariables({ minYear: parseInt(minYearInput.value) });
	updateStatusText();
});
maxYearInput.addEventListener("input", function() {
	pointsLayer.updateStyleVariables({ maxYear: parseInt(maxYearInput.value) });
	updateStatusText();
});
updateStatusText();
var client = new XMLHttpRequest();
client.open("GET", "data/csv/meteorite_landings.csv");
client.onload = function() {
	const csv = client.responseText;
	const features = [];
	let prevIndex = csv.indexOf("\n") + 1;
	let curIndex;
	while ((curIndex = csv.indexOf("\n", prevIndex)) != -1) {
		const line = csv.substr(prevIndex, curIndex - prevIndex).split(",");
		prevIndex = curIndex + 1;
		const coords = fromLonLat([parseFloat(line[4]), parseFloat(line[3])]);
		if (isNaN(coords[0]) || isNaN(coords[1])) continue;
		features.push(new Feature({
			mass: parseFloat(line[1]) || 0,
			year: parseInt(line[2]) || 0,
			geometry: new Point(coords)
		}));
	}
	vectorSource.addFeatures(features);
};
client.send();
var map = new Map({
	layers: [new TileLayer({ source: new StadiaMaps({ layer: "stamen_toner" }) }), pointsLayer],
	target: document.getElementById("map"),
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
function animate() {
	map.render();
	window.requestAnimationFrame(animate);
}
animate();
//#endregion

//# sourceMappingURL=filter-points-webgl.js.map