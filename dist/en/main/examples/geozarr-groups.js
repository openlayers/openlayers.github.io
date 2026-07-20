import { Cn as OSM, Ht as WebGLTileLayer, M as Link, Mn as Map, N as GeoZarr, cr as withExtentCenter, lr as withHigherResolutions, sr as getView } from "./common.js";
//#region examples/geozarr-groups.js
var source = new GeoZarr({
	url: "https://s3.explorer.eopf.copernicus.eu/esa-zarr-sentinel-explorer-fra/tests-output/sentinel-2-l2a/S2B_MSIL2A_20260120T125339_N0511_R138_T27VWL_20260120T131151.zarr",
	bands: [
		{
			name: "b04",
			group: "measurements/reflectance"
		},
		{
			name: "b03",
			group: "measurements/reflectance"
		},
		{
			name: "b02",
			group: "measurements/reflectance"
		},
		{
			name: "cld",
			group: "quality/probability"
		}
	]
});
var layer = new WebGLTileLayer({
	style: {
		variables: { threshold: 50 },
		gamma: 1.5,
		color: [
			"color",
			[
				"interpolate",
				["linear"],
				["band", 1],
				0,
				0,
				.5,
				255
			],
			[
				"interpolate",
				["linear"],
				["band", 2],
				0,
				0,
				.5,
				255
			],
			[
				"interpolate",
				["linear"],
				["band", 3],
				0,
				0,
				.5,
				255
			],
			[
				"case",
				[
					">",
					["band", 4],
					["var", "threshold"]
				],
				0,
				1
			]
		]
	},
	source
});
new Map({
	layers: [new WebGLTileLayer({ source: new OSM() }), layer],
	target: "map",
	view: getView(source, withHigherResolutions(2), withExtentCenter())
}).addInteraction(new Link());
var thresholdSlider = document.getElementById("threshold");
var thresholdValue = document.getElementById("threshold-value");
thresholdSlider.addEventListener("input", function() {
	thresholdValue.textContent = thresholdSlider.value;
	layer.updateStyleVariables({ threshold: parseFloat(thresholdSlider.value) });
});
//#endregion

//# sourceMappingURL=geozarr-groups.js.map