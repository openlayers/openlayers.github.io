import { Cn as OSM, F as WebGLVectorLayer, Ht as WebGLTileLayer, Mn as Map, dn as VectorSource, or as View, rn as GeoJSON } from "./common.js";
//#region examples/webgl-vector-layer.js
/** @type {import('../src/ol/style/flat.js').FlatStyleLike} */
var style = [
	{
		filter: [
			"==",
			["var", "highlightedId"],
			["id"]
		],
		style: {
			"stroke-color": "white",
			"stroke-width": 3,
			"stroke-offset": -1,
			"fill-color": [
				255,
				255,
				255,
				.4
			]
		}
	},
	{
		else: true,
		style: {
			"stroke-color": [
				"*",
				["get", "COLOR"],
				[
					220,
					220,
					220
				]
			],
			"stroke-width": 2,
			"stroke-offset": -1,
			"fill-color": [
				"*",
				["get", "COLOR"],
				[
					255,
					255,
					255,
					.6
				]
			]
		}
	},
	{ style: {
		"text-value": [
			"coalesce",
			["get", "ECO_NAME"],
			"unknown"
		],
		"text-font": "bold 12px \"Open Sans\", \"Arial Unicode MS\", sans-serif",
		"text-fill-color": "rgb(0,0,0)",
		"text-stroke-color": "rgba(255, 255, 255, 0.8)",
		"text-stroke-width": 2,
		"text-overflow": false
	} }
];
var osm = new WebGLTileLayer({ source: new OSM() });
var vectorLayer = new WebGLVectorLayer({
	source: new VectorSource({
		url: "https://openlayers.org/data/vector/ecoregions.json",
		format: new GeoJSON()
	}),
	style,
	variables: { highlightedId: -1 }
});
var map = new Map({
	layers: [osm, vectorLayer],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 1
	})
});
var highlightedId = -1;
var displayFeatureInfo = function(pixel) {
	const feature = map.forEachFeatureAtPixel(pixel, function(feature) {
		return feature;
	});
	const info = document.getElementById("info");
	if (feature) info.innerHTML = feature.get("ECO_NAME") || "&nbsp;";
	else info.innerHTML = "&nbsp;";
	const id = feature ? feature.getId() : -1;
	if (id !== highlightedId) {
		highlightedId = id;
		vectorLayer.updateStyleVariables({ highlightedId });
	}
};
map.on("pointermove", function(evt) {
	if (evt.dragging) return;
	displayFeatureInfo(evt.pixel);
});
map.on("click", function(evt) {
	displayFeatureInfo(evt.pixel);
});
//#endregion

//# sourceMappingURL=webgl-vector-layer.js.map