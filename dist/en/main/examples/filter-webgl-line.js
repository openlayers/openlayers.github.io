import { Cn as OSM, F as WebGLVectorLayer, Mn as Map, X as IGC, dn as VectorSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/filter-webgl-line.js
var igcUrls = [
	"data/igc/Clement-Latour.igc",
	"data/igc/Damien-de-Baenst.igc",
	"data/igc/Sylvain-Dhonneur.igc",
	"data/igc/Tom-Payne.igc",
	"data/igc/Ulrich-Prinz.igc"
];
var source = new VectorSource({ features: [] });
var format = new IGC();
for (let i = 0; i < igcUrls.length; ++i) fetch(igcUrls[i]).then((resp) => resp.text()).then((data) => {
	const features = format.readFeatures(data, { featureProjection: "EPSG:3857" });
	source.addFeatures(features);
});
var timestamp = 130324e4;
var vectorLayer = new WebGLVectorLayer({
	source,
	style: [{
		style: {
			"stroke-width": 4,
			"stroke-color": [
				"interpolate",
				["linear"],
				["line-metric"],
				13032e5,
				"hsl(312,100%,39%)",
				130324e4,
				"hsl(36,100%,45%)"
			]
		},
		filter: [
			"<=",
			["line-metric"],
			["var", "timestamp"]
		]
	}],
	variables: { timestamp }
});
var map = new Map({
	layers: [new TileLayer({ source: new OSM() }), vectorLayer],
	target: "map",
	view: new View({
		center: [703365.7089403362, 5714629.865071137],
		zoom: 9
	})
});
function showTime() {
	const dateTime = /* @__PURE__ */ new Date(timestamp * 1e3);
	document.getElementById("time-value").textContent = dateTime.toUTCString();
}
document.getElementById("time-input").addEventListener("input", (event) => {
	timestamp = parseFloat(event.target.value);
	vectorLayer.updateStyleVariables({ timestamp });
	showTime();
	map.render();
});
showTime();
//#endregion

//# sourceMappingURL=filter-webgl-line.js.map