import { Cr as fromLonLat, F as WebGLVectorLayer, Ht as WebGLTileLayer, Mn as Map, an as ImageTileSource, dn as VectorSource, hr as Point, or as View, xn as Feature } from "./common.js";
//#region examples/icon-sprite-webgl.js
var map = new Map({
	layers: [new WebGLTileLayer({ source: new ImageTileSource({
		attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
		url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB"
	}) })],
	target: document.getElementById("map"),
	view: new View({
		center: [0, 4e6],
		zoom: 2
	})
});
var pointsLayer = new WebGLVectorLayer({
	variables: { filterShape: "all" },
	source: new VectorSource({
		features: [],
		attributions: "National UFO Reporting Center"
	}),
	style: [{
		style: {
			"icon-src": "data/ufo_shapes.png",
			"icon-width": 128,
			"icon-height": 64,
			"icon-color": [
				"interpolate",
				["linear"],
				["get", "year"],
				1950,
				[
					255,
					160,
					110
				],
				2013,
				[
					180,
					255,
					200
				]
			],
			"icon-offset": [
				"match",
				["get", "shape"],
				"light",
				[0, 0],
				"sphere",
				[32, 0],
				"circle",
				[32, 0],
				"disc",
				[64, 0],
				"oval",
				[64, 0],
				"triangle",
				[96, 0],
				"fireball",
				[0, 32],
				[96, 32]
			],
			"icon-size": [32, 32],
			"icon-scale": .5
		},
		filter: [
			"any",
			[
				"==",
				["var", "filterShape"],
				"all"
			],
			[
				"==",
				["var", "filterShape"],
				["get", "shape"]
			]
		]
	}]
});
var shapeSelect = document.getElementById("shape-filter");
shapeSelect.addEventListener("input", function() {
	pointsLayer.updateStyleVariables({ filterShape: shapeSelect.value });
	map.render();
});
function fillShapeSelect(shapeTypes) {
	Object.keys(shapeTypes).sort(function(a, b) {
		return shapeTypes[b] - shapeTypes[a];
	}).forEach(function(shape) {
		const option = document.createElement("option");
		const sightings = shapeTypes[shape];
		option.text = `${shape} (${sightings} sighting${sightings === 1 ? "" : "s"})`;
		option.value = shape;
		shapeSelect.appendChild(option);
	});
}
var client = new XMLHttpRequest();
client.open("GET", "data/csv/ufo_sighting_data.csv");
client.addEventListener("load", function() {
	const csv = client.responseText;
	const shapeTypes = {};
	const features = [];
	let prevIndex = csv.indexOf("\n") + 1;
	let curIndex;
	while ((curIndex = csv.indexOf("\n", prevIndex)) !== -1) {
		const line = csv.substring(prevIndex, curIndex).split(",");
		prevIndex = curIndex + 1;
		const coords = [parseFloat(line[5]), parseFloat(line[4])];
		const shape = line[2];
		shapeTypes[shape] = (shapeTypes[shape] || 0) + 1;
		features.push(new Feature({
			datetime: line[0],
			year: parseInt(/[0-9]{4}/.exec(line[0])[0], 10),
			shape,
			duration: line[3],
			geometry: new Point(fromLonLat(coords))
		}));
	}
	shapeTypes["all"] = features.length;
	pointsLayer.getSource().addFeatures(features);
	map.addLayer(pointsLayer);
	fillShapeSelect(shapeTypes);
});
client.send();
var info = document.getElementById("info");
map.on("pointermove", function(evt) {
	if (map.getView().getInteracting() || map.getView().getAnimating()) return;
	info.innerText = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
		return `On ${feature.get("datetime")}, lasted ${feature.get("duration")} seconds and had a "${feature.get("shape")}" shape.`;
	}) || "";
});
//#endregion

//# sourceMappingURL=icon-sprite-webgl.js.map