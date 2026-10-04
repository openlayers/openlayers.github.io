import { Ht as WebGLTileLayer, Mn as Map, Rt as GeoTIFFSource, or as View } from "./common.js";
//#region examples/cog-stretch.js
var channels = [
	"red",
	"green",
	"blue"
];
for (const channel of channels) {
	document.getElementById(channel).addEventListener("change", update);
	document.getElementById(`${channel}Max`).addEventListener("input", update);
}
function getVariables() {
	const variables = {};
	for (const channel of channels) {
		const selector = document.getElementById(channel);
		variables[channel] = parseInt(selector.value, 10);
		const inputId = `${channel}Max`;
		const input = document.getElementById(inputId);
		variables[inputId] = parseInt(input.value, 10);
	}
	return variables;
}
var layer = new WebGLTileLayer({
	style: {
		variables: getVariables(),
		color: [
			"array",
			[
				"/",
				["band", ["var", "red"]],
				["var", "redMax"]
			],
			[
				"/",
				["band", ["var", "green"]],
				["var", "greenMax"]
			],
			[
				"/",
				["band", ["var", "blue"]],
				["var", "blueMax"]
			],
			1
		]
	},
	source: new GeoTIFFSource({
		normalize: false,
		sources: [{ url: "https://cloudlessdownloads.eox.at/api/public/dl/jvu06wnt/exploitation-ready-epsg-4326/exploitation-ready_eoxcloudless-sentinel-2-2025_zoom-4_4bands_16bit.tif" }]
	})
});
function update() {
	layer.updateStyleVariables(getVariables());
}
new Map({
	target: "map",
	layers: [layer],
	view: new View({
		projection: "EPSG:4326",
		center: [0, 0],
		zoom: 2,
		maxZoom: 6
	})
});
//#endregion

//# sourceMappingURL=cog-stretch.js.map