import { Bt as register, Gr as getCenter, Hr as createEmpty, Ht as WebGLTileLayer, It as proj4, Mn as Map, Rt as GeoTIFFSource, Ur as extend, kr as transformExtent } from "./common.js";
//#region examples/multiple-cogs.js
proj4.defs("EPSG:32631", "+proj=utm +zone=31 +datum=WGS84 +units=m +no_defs");
proj4.defs("EPSG:32632", "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs");
register(proj4);
var channels = [
	"red",
	"green",
	"blue"
];
for (const channel of channels) document.getElementById(channel).addEventListener("change", update);
function getVariables() {
	const variables = {};
	for (const channel of channels) {
		const selector = document.getElementById(channel);
		variables[channel] = parseInt(selector.value, 10);
	}
	return variables;
}
var sourceNames = [
	"B04",
	"B03",
	"B02",
	"B08"
];
var sources = [new GeoTIFFSource({ sources: sourceNames.map(function(name) {
	return {
		url: `https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/31/T/GJ/2022/7/S2A_31TGJ_20220703_0_L2A/${name}.tif`,
		max: 3e3
	};
}) }), new GeoTIFFSource({ sources: sourceNames.map(function(name) {
	return {
		url: `https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/32/T/LP/2022/7/S2A_32TLP_20220703_0_L2A/${name}.tif`,
		max: 3e3
	};
}) })];
var layer = new WebGLTileLayer({
	sources,
	style: {
		variables: getVariables(),
		color: [
			"array",
			["band", ["var", "red"]],
			["band", ["var", "green"]],
			["band", ["var", "blue"]],
			["band", 5]
		]
	}
});
function update() {
	layer.updateStyleVariables(getVariables());
}
new Map({
	target: "map",
	layers: [layer],
	view: Promise.all(sources.map(function(source) {
		return source.getView();
	})).then(function(options) {
		const projection = "EPSG:3857";
		const extent = createEmpty();
		options.forEach(function(options) {
			extend(extent, transformExtent(options.extent, options.projection, projection));
		});
		return {
			projection,
			center: getCenter(extent),
			zoom: 0,
			extent
		};
	})
});
//#endregion

//# sourceMappingURL=multiple-cogs.js.map