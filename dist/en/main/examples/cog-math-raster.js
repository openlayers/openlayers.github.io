import { It as RasterSource, Mn as Map, Rt as GeoTIFFSource, un as ImageLayer } from "./common.js";
//#region examples/cog-math-raster.js
var cog = new GeoTIFFSource({
	normalize: false,
	sources: [{ url: "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/B04.tif" }, { url: "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/B08.tif" }]
});
var ndviStops = [
	-.2,
	[
		191,
		191,
		191
	],
	-.1,
	[
		219,
		219,
		219
	],
	0,
	[
		255,
		255,
		224
	],
	.025,
	[
		255,
		250,
		204
	],
	.05,
	[
		237,
		232,
		181
	],
	.075,
	[
		222,
		217,
		156
	],
	.1,
	[
		204,
		199,
		130
	],
	.125,
	[
		189,
		184,
		107
	],
	.15,
	[
		176,
		194,
		97
	],
	.175,
	[
		163,
		204,
		89
	],
	.2,
	[
		145,
		191,
		82
	],
	.25,
	[
		128,
		179,
		71
	],
	.3,
	[
		112,
		163,
		64
	],
	.35,
	[
		97,
		150,
		54
	],
	.4,
	[
		79,
		138,
		46
	],
	.45,
	[
		64,
		125,
		36
	],
	.5,
	[
		48,
		110,
		28
	],
	.55,
	[
		33,
		97,
		18
	],
	.6,
	[
		15,
		84,
		10
	],
	.65,
	[
		0,
		69,
		0
	]
];
/**
* Map a value to an `[r, g, b, a]` color using a ramp of `value, [r, g, b]`
* stops.  Provided to the operation with the `lib` option so it is available in
* the worker.
* @param {number} value The value to map.
* @param {Array<number|Array<number>>} stops Flat `value, color` ramp stops.
* @return {Array<number>} The `[r, g, b, a]` color.
*/
function colorFromRamp(value, stops) {
	if (value <= stops[0]) {
		const first = stops[1];
		return [
			first[0],
			first[1],
			first[2],
			255
		];
	}
	for (let i = 2; i < stops.length; i += 2) if (value <= stops[i]) {
		const lowValue = stops[i - 2];
		const lowColor = stops[i - 1];
		const highValue = stops[i];
		const highColor = stops[i + 1];
		const f = (value - lowValue) / (highValue - lowValue);
		return [
			lowColor[0] + f * (highColor[0] - lowColor[0]),
			lowColor[1] + f * (highColor[1] - lowColor[1]),
			lowColor[2] + f * (highColor[2] - lowColor[2]),
			255
		];
	}
	const last = stops[stops.length - 1];
	return [
		last[0],
		last[1],
		last[2],
		255
	];
}
/**
* Compute NDVI from the two input bands and map it through the color ramp.
* @param {Array<Array<number>>} pixels One pixel per input source; the first
*     (and only) input carries the red and near-infrared bands.
* @param {Object} data The object populated in the "beforeoperations" event.
* @return {Array<number>} An `[r, g, b, a]` pixel.
*/
function ndviToColor(pixels, data) {
	const red = pixels[0][0];
	const nir = pixels[0][1];
	const sum = nir + red;
	if (!sum) return [
		0,
		0,
		0,
		0
	];
	return colorFromRamp((nir - red) / sum, data.stops);
}
var raster = new RasterSource({
	sources: [cog],
	operation: ndviToColor,
	lib: { colorFromRamp }
});
raster.on("beforeoperations", (event) => {
	event.data.stops = ndviStops;
});
var map = new Map({
	target: "map",
	layers: [new ImageLayer({ source: raster })],
	view: cog.getView()
});
var output = document.getElementById("output");
map.on(["pointermove", "click"], function(event) {
	const pixels = raster.getData(event.coordinate);
	if (!pixels) {
		output.textContent = " ";
		return;
	}
	const [red, nir] = pixels[0];
	const sum = nir + red;
	output.textContent = sum ? ((nir - red) / sum).toFixed(2) : " ";
});
//#endregion

//# sourceMappingURL=cog-math-raster.js.map