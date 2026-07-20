import { Cn as OSM, Ht as WebGLTileLayer, Mn as Map, N as GeoZarr, cr as withExtentCenter, dr as withZoom, lr as withHigherResolutions, sr as getView, ur as withLowerResolutions } from "./common.js";
//#region examples/geozarr-dimensions.js
var source = new GeoZarr({
	url: "https://s3.explorer.eopf.copernicus.eu/esa-zarr-sentinel-explorer-fra/tests-output/sentinel-1-grd-rtc-staging/s1-rtc-28RBS.zarr/descending",
	bands: ["vv", "vh"]
});
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source: new OSM() }), new WebGLTileLayer({
		style: { color: [
			"color",
			[
				"interpolate",
				["linear"],
				["band", 1],
				0,
				0,
				.4,
				255
			],
			[
				"interpolate",
				["linear"],
				["band", 2],
				0,
				0,
				.1,
				255
			],
			[
				"interpolate",
				["linear"],
				[
					"/",
					["band", 1],
					["band", 2]
				],
				1,
				0,
				15,
				255
			]
		] },
		source
	})],
	view: getView(source, withLowerResolutions(1), withHigherResolutions(2), withExtentCenter(), withZoom(2))
});
var slider = document.getElementById("time");
var label = document.getElementById("time-label");
source.getDimensions().then(async ({ time }) => {
	const { units } = time.attributes;
	const epoch = Date.parse(units.split(" since ")[1]);
	const toDate = (value) => new Date(epoch + Number(value) / 1e6);
	const slices = await Promise.all([...Array(time.size).keys()].map(async (index) => ({
		index,
		date: toDate(await source.getValue("time", index))
	})));
	slices.sort((a, b) => a.date - b.date);
	function showSlice(position) {
		const { index, date } = slices[position];
		source.updateDimensions({ time: index });
		label.textContent = date.toISOString().slice(0, 16).replace("T", " ");
	}
	slider.max = String(time.size - 1);
	slider.disabled = false;
	slider.addEventListener("input", () => showSlice(Number(slider.value)));
	showSlice(0);
}).catch(() => label.textContent = "Failed to load the GeoZarr store.");
//#endregion

//# sourceMappingURL=geozarr-dimensions.js.map