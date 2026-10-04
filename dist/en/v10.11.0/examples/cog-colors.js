import { Ht as WebGLTileLayer, Lt as scale_default, Mn as Map, Rt as GeoTIFFSource } from "./common.js";
//#region examples/cog-colors.js
var segments = 10;
var defaultMinColor = "#0300AD";
var defaultMaxColor = "#00ff00";
var defaultMinValue = -.5;
var defaultMaxValue = .7;
var minColorInput = document.getElementById("min-color");
minColorInput.value = defaultMinColor;
var maxColorInput = document.getElementById("max-color");
maxColorInput.value = defaultMaxColor;
var minValueOutput = document.getElementById("min-value-output");
var minValueInput = document.getElementById("min-value-input");
minValueInput.value = defaultMinValue.toString();
var maxValueOutput = document.getElementById("max-value-output");
var maxValueInput = document.getElementById("max-value-input");
maxValueInput.value = defaultMaxValue.toString();
function getVariables() {
	const variables = {};
	const minColor = minColorInput.value;
	const maxColor = maxColorInput.value;
	const scale = scale_default([minColor, maxColor]).mode("lab");
	const minValue = parseFloat(minValueInput.value);
	const delta = (parseFloat(maxValueInput.value) - minValue) / segments;
	for (let i = 0; i <= segments; ++i) {
		const color = scale(i / segments).rgb();
		const value = minValue + i * delta;
		variables[`value${i}`] = value;
		variables[`red${i}`] = color[0];
		variables[`green${i}`] = color[1];
		variables[`blue${i}`] = color[2];
	}
	return variables;
}
function colors() {
	const stops = [];
	for (let i = 0; i <= segments; ++i) {
		stops[i * 2] = ["var", `value${i}`];
		const red = ["var", `red${i}`];
		const green = ["var", `green${i}`];
		const blue = ["var", `blue${i}`];
		stops[i * 2 + 1] = [
			"color",
			red,
			green,
			blue
		];
	}
	return stops;
}
var ndvi = [
	"/",
	[
		"-",
		["band", 2],
		["band", 1]
	],
	[
		"+",
		["band", 2],
		["band", 1]
	]
];
var source = new GeoTIFFSource({ sources: [{
	url: "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/B04.tif",
	max: 1e4
}, {
	url: "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/B08.tif",
	max: 1e4
}] });
var layer = new WebGLTileLayer({
	style: {
		variables: getVariables(),
		color: [
			"interpolate",
			["linear"],
			ndvi,
			...colors()
		]
	},
	source
});
function update() {
	layer.updateStyleVariables(getVariables());
	minValueOutput.innerText = parseFloat(minValueInput.value).toFixed(1);
	maxValueOutput.innerText = parseFloat(maxValueInput.value).toFixed(1);
}
minColorInput.addEventListener("input", update);
maxColorInput.addEventListener("input", update);
minValueInput.addEventListener("input", update);
maxValueInput.addEventListener("input", update);
update();
new Map({
	target: "map",
	layers: [layer],
	view: source.getView()
});
//#endregion

//# sourceMappingURL=cog-colors.js.map