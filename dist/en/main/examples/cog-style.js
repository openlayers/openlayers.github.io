import { Ht as WebGLTileLayer, Mn as Map, Rt as GeoTIFFSource, or as View } from "./common.js";
//#region examples/cog-style.js
var max = 3e3;
function normalize(value) {
	return [
		"/",
		value,
		max
	];
}
var red = normalize(["band", 1]);
var green = normalize(["band", 2]);
var blue = normalize(["band", 3]);
var nir = normalize(["band", 4]);
var trueColor = {
	color: [
		"array",
		red,
		green,
		blue,
		1
	],
	gamma: 1.1
};
var falseColor = {
	color: [
		"array",
		nir,
		red,
		green,
		1
	],
	gamma: 1.1
};
var ndvi = { color: [
	"interpolate",
	["linear"],
	[
		"/",
		[
			"-",
			nir,
			red
		],
		[
			"+",
			nir,
			red
		]
	],
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
] };
var ndviPalettePlasma = { color: [
	"palette",
	[
		"interpolate",
		["linear"],
		[
			"/",
			[
				"-",
				nir,
				red
			],
			[
				"+",
				nir,
				red
			]
		],
		-.2,
		0,
		.65,
		4
	],
	[
		"#0d0887",
		"#7e03a8",
		"#cb4778",
		"#f89540",
		"#f0f921"
	]
] };
var ndviPaletteViridis = { color: [
	"palette",
	[
		"interpolate",
		["linear"],
		[
			"/",
			[
				"-",
				nir,
				red
			],
			[
				"+",
				nir,
				red
			]
		],
		-.2,
		0,
		.65,
		4
	],
	[
		"#440154",
		"#3b528b",
		"#21918c",
		"#5ec962",
		"#fde725"
	]
] };
var layer = new WebGLTileLayer({
	style: trueColor,
	source: new GeoTIFFSource({
		normalize: false,
		sources: [{ url: "https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif" }]
	})
});
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
var styles = {
	trueColor,
	falseColor,
	ndvi,
	ndviPalettePlasma,
	ndviPaletteViridis
};
var styleSelector = document.getElementById("style");
function update() {
	const style = styles[styleSelector.value];
	layer.setStyle(style);
}
styleSelector.addEventListener("change", update);
//#endregion

//# sourceMappingURL=cog-style.js.map