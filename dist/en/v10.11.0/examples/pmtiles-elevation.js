import { Ar as useGeographic, Ht as WebGLTileLayer, Mn as Map, S as w, on as DataTileSource, or as View } from "./common.js";
//#region examples/pmtiles-elevation.js
useGeographic();
var tiles = new w("https://pub-9288c68512ed46eca46ddcade307709b.r2.dev/protomaps-sample-datasets/terrarium_z9.pmtiles");
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.addEventListener("load", () => resolve(img));
		img.addEventListener("error", () => reject(/* @__PURE__ */ new Error("load failed")));
		img.src = src;
	});
}
async function loader(z, x, y, { signal }) {
	const response = await tiles.getZxy(z, x, y, signal);
	const blob = new Blob([response.data]);
	const src = URL.createObjectURL(blob);
	const image = await loadImage(src);
	URL.revokeObjectURL(src);
	return image;
}
function elevation(xOffset, yOffset) {
	return [
		"+",
		[
			"*",
			255 * 256,
			[
				"band",
				1,
				xOffset,
				yOffset
			]
		],
		[
			"*",
			255,
			[
				"band",
				2,
				xOffset,
				yOffset
			]
		],
		[
			"*",
			255 / 256,
			[
				"band",
				3,
				xOffset,
				yOffset
			]
		],
		-32768
	];
}
var dp = [
	"*",
	2,
	["resolution"]
];
var z0x = [
	"*",
	["var", "vert"],
	elevation(-1, 0)
];
var dzdx = [
	"/",
	[
		"-",
		[
			"*",
			["var", "vert"],
			elevation(1, 0)
		],
		z0x
	],
	dp
];
var z0y = [
	"*",
	["var", "vert"],
	elevation(0, -1)
];
var dzdy = [
	"/",
	[
		"-",
		[
			"*",
			["var", "vert"],
			elevation(0, 1)
		],
		z0y
	],
	dp
];
var slope = ["atan", ["sqrt", [
	"+",
	[
		"^",
		dzdx,
		2
	],
	[
		"^",
		dzdy,
		2
	]
]]];
var aspect = [
	"clamp",
	[
		"atan",
		[
			"-",
			0,
			dzdx
		],
		dzdy
	],
	-Math.PI,
	Math.PI
];
var sunEl = [
	"*",
	Math.PI / 180,
	["var", "sunEl"]
];
var sunAz = [
	"*",
	Math.PI / 180,
	["var", "sunAz"]
];
var scaled = [
	"*",
	255,
	[
		"+",
		[
			"*",
			["sin", sunEl],
			["cos", slope]
		],
		[
			"*",
			["cos", sunEl],
			["sin", slope],
			["cos", [
				"-",
				sunAz,
				aspect
			]]
		]
	]
];
var variables = {};
var layer = new WebGLTileLayer({
	source: new DataTileSource({
		loader,
		wrapX: true,
		maxZoom: 9,
		attributions: "<a href='https://github.com/tilezen/joerd/blob/master/docs/attribution.md#attribution'>Tilezen Jörð</a>"
	}),
	style: {
		variables,
		color: ["color", scaled]
	}
});
[
	"vert",
	"sunEl",
	"sunAz"
].forEach(function(id) {
	const control = document.getElementById(id);
	const output = document.getElementById(id + "Out");
	function updateValues() {
		output.innerText = control.value;
		variables[id] = Number(control.value);
	}
	updateValues();
	control.addEventListener("input", function() {
		updateValues();
		layer.updateStyleVariables(variables);
	});
});
var map = new Map({
	target: "map",
	layers: [layer],
	view: new View({
		center: [0, 0],
		zoom: 1
	})
});
function getElevation(data) {
	const red = data[0];
	const green = data[1];
	const blue = data[2];
	return red * 256 + green + blue / 256 - 32768;
}
function formatLocation([lon, lat]) {
	const NS = lat < 0 ? "S" : "N";
	const EW = lon < 0 ? "W" : "E";
	return `${Math.abs(lat).toFixed(1)}° ${NS}, ${Math.abs(lon).toFixed(1)}° ${EW}`;
}
var elevationOut = document.getElementById("elevationOut");
var locationOut = document.getElementById("locationOut");
function displayPixelValue(event) {
	const data = layer.getData(event.pixel);
	if (!data) return;
	elevationOut.innerText = getElevation(data).toLocaleString() + " m";
	locationOut.innerText = formatLocation(event.coordinate);
}
map.on(["pointermove", "click"], displayPixelValue);
//#endregion

//# sourceMappingURL=pmtiles-elevation.js.map