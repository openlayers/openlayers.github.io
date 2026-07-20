import { Cn as OSM, Ht as WebGLTileLayer, M as Link, Mn as Map, N as GeoZarr, cr as withExtentCenter, lr as withHigherResolutions, sr as getView } from "./common.js";
//#region examples/geozarr-sparse.js
var source = new GeoZarr({
	url: "https://s3.explorer.eopf.copernicus.eu/esa-zarr-sentinel-explorer-fra/tests-output/sentinel-2-l2a/S2B_MSIL2A_20260120T125339_N0511_R138_T27VWL_20260120T131151.zarr/measurements/reflectance",
	bands: [
		"b11",
		"b03",
		"b02"
	]
});
new Map({
	layers: [new WebGLTileLayer({ source: new OSM() }), new WebGLTileLayer({
		style: {
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
				]
			]
		},
		source
	})],
	target: "map",
	view: getView(source, withHigherResolutions(2), withExtentCenter())
}).addInteraction(new Link());
//#endregion

//# sourceMappingURL=geozarr-sparse.js.map