import { Cr as fromLonLat, H as Heatmap, Mn as Map, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON, yn as StadiaMaps } from "./common.js";
//#region examples/heatmap-trajectories.js
var blur = document.getElementById("blur");
var radius = document.getElementById("radius");
var heatmap = new Heatmap({
	source: new VectorSource({
		url: "data/geojson/ship-trajectories.json",
		format: new GeoJSON(),
		attributions: "Danish Maritime Authority"
	}),
	blur: [
		"/",
		["var", "blur"],
		2
	],
	radius: [
		"/",
		["var", "radius"],
		2
	],
	variables: {
		blur: parseInt(blur.value, 10),
		radius: parseInt(radius.value, 10),
		shipType: "All"
	},
	filter: [
		"any",
		[
			"==",
			["var", "shipType"],
			"All"
		],
		[
			"==",
			["var", "shipType"],
			["get", "ShipType"]
		]
	],
	weight: () => .1
});
var map = new Map({
	layers: [new TileLayer({ source: new StadiaMaps({ layer: "alidade_smooth_dark" }) }), heatmap],
	target: "map",
	view: new View({
		center: fromLonLat([11.86, 57.67]),
		zoom: 12
	})
});
blur.addEventListener("input", function() {
	heatmap.updateStyleVariables({ blur: parseInt(blur.value, 10) });
});
radius.addEventListener("input", function() {
	heatmap.updateStyleVariables({ radius: parseInt(radius.value, 10) });
});
var shipTypeSelect = document.getElementById("shiptype-filter");
shipTypeSelect.addEventListener("input", function() {
	heatmap.updateStyleVariables({ shipType: shipTypeSelect.value });
	map.render();
});
//#endregion

//# sourceMappingURL=heatmap-trajectories.js.map