import { Cn as OSM, Ht as WebGLTileLayer, Mn as Map, an as ImageTileSource, or as View } from "./common.js";
//#region examples/webgl-shaded-relief.js
var variables = {};
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
var shadedRelief = new WebGLTileLayer({
	opacity: .3,
	source: new ImageTileSource({
		url: "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
		maxZoom: 15,
		attributions: "<a href=\"https://github.com/tilezen/joerd/blob/master/docs/attribution.md\" target=\"_blank\">Data sources and attribution</a>"
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
		shadedRelief.updateStyleVariables(variables);
	});
});
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source: new OSM() }), shadedRelief],
	view: new View({
		center: [-13615645, 4497969],
		zoom: 13
	})
});
//#endregion

//# sourceMappingURL=webgl-shaded-relief.js.map