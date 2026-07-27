import { Cn as OSM, Ht as WebGLTileLayer, Mn as Map, N as GeoZarr, cr as withExtentCenter, lr as withHigherResolutions, sr as getView } from "./common.js";
//#region examples/geozarr-stretch.js
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
		variables[channel] = parseFloat(selector.value);
		const inputId = `${channel}Max`;
		const input = document.getElementById(inputId);
		variables[inputId] = parseFloat(input.value);
	}
	return variables;
}
var source = new GeoZarr({
	url: "https://s3.explorer.eopf.copernicus.eu/esa-zarr-sentinel-explorer-fra/tests-output/sentinel-2-l2a/S2B_MSIL2A_20260120T125339_N0511_R138_T27VWL_20260120T131151.zarr/measurements/reflectance",
	bands: [
		"b04",
		"b03",
		"b02",
		"b11"
	]
});
var layer = new WebGLTileLayer({
	style: {
		variables: getVariables(),
		gamma: 1.5,
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
	source
});
function update() {
	layer.updateStyleVariables(getVariables());
}
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source: new OSM() }), layer],
	view: getView(source, withHigherResolutions(2), withExtentCenter())
});
//#endregion

//# sourceMappingURL=geozarr-stretch.js.map