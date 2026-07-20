import { Cn as OSM, Cr as fromLonLat, Dr as toLonLat, Ht as WebGLTileLayer, Mn as Map, Tt as RasterSource, on as DataTileSource, or as View, un as ImageLayer, vt as MousePosition, zr as toStringHDMS } from "./common.js";
//#region examples/contour-interpolation.js
var attribution = "<a href=\"https://github.com/tilezen/joerd/blob/master/docs/attribution.md\" target=\"_blank\">Data sources and attribution</a>";
var calculateElevation = function(pixel) {
	if (pixel[3]) return -32768 + (pixel[0] * 256 + pixel[1] + pixel[2] / 256);
};
var calculateElevationFromData = function(pixel) {
	return pixel[0];
};
var elevation = ["band", 1];
var tileSize = 256;
var gutter = 1;
var canvas = document.createElement("canvas");
canvas.width = tileSize * 3;
canvas.height = tileSize * 3;
var context = canvas.getContext("2d", { willReadFrequently: true });
var source = new DataTileSource({
	attributions: attribution,
	tileSize,
	gutter,
	maxZoom: 15,
	interpolate: true,
	wrapX: true,
	loader: (z, x, y) => {
		const promises = [];
		for (let i = 0; i < 3; ++i) for (let j = 0; j < 3; ++j) promises.push(new Promise((resolve, reject) => {
			const maxY = 2 ** z;
			const yy = y + j - 1;
			if (yy < 0 || yy >= maxY) return resolve();
			const maxX = 2 ** z;
			const xx = ((x + i - 1) % maxX + maxX) % maxX;
			const image = new Image();
			image.crossOrigin = "";
			image.addEventListener("error", () => reject());
			image.addEventListener("load", () => resolve(image));
			image.src = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${xx}/${yy}.png`;
		}));
		return Promise.all(promises).then((images) => {
			context.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = 0; i < 3; ++i) for (let j = 0; j < 3; ++j) {
				const image = images.shift();
				if (image) context.drawImage(image, i * tileSize, j * tileSize);
			}
			const data = context.getImageData(tileSize - gutter, tileSize - gutter, 258, 258).data;
			const pixels = data.length / 4;
			const floatData = new Float32Array(data.buffer);
			for (let i = 0, j = 0; i < pixels;) floatData[i++] = calculateElevation(data.slice(j, j += 4));
			return floatData;
		});
	}
});
var pixelValue = [
	"*",
	[
		"+",
		elevation,
		32768
	],
	256
];
var style = { color: [
	"array",
	[
		"/",
		["floor", [
			"/",
			pixelValue,
			256 * 256
		]],
		255
	],
	[
		"/",
		["floor", [
			"/",
			[
				"%",
				pixelValue,
				256 * 256
			],
			256
		]],
		255
	],
	[
		"/",
		[
			"%",
			pixelValue,
			256
		],
		255
	],
	1
] };
var elevation1 = new WebGLTileLayer({
	source,
	style
});
var elevation2 = new WebGLTileLayer({
	source,
	style
});
var contours = function(inputs, data) {
	const elevationImage = inputs[0];
	const width = elevationImage.width;
	const height = elevationImage.height;
	const elevationData = elevationImage.data;
	const pixel = [
		0,
		0,
		0,
		0
	];
	const contourData = new Uint8ClampedArray(elevationData.length);
	const interval = data.interval;
	let offset, pixelY, pixelX;
	for (pixelY = 0; pixelY < height; ++pixelY) for (pixelX = 0; pixelX < width; ++pixelX) {
		offset = (pixelY * width + Math.max(pixelX - 1, 0)) * 4;
		pixel[0] = elevationData[offset];
		pixel[1] = elevationData[offset + 1];
		pixel[2] = elevationData[offset + 2];
		pixel[3] = elevationData[offset + 3];
		const leftElevation = calculateElevation(pixel);
		offset = (pixelY * width + Math.min(pixelX + 1, width - 1)) * 4;
		pixel[0] = elevationData[offset];
		pixel[1] = elevationData[offset + 1];
		pixel[2] = elevationData[offset + 2];
		pixel[3] = elevationData[offset + 3];
		const rightElevation = calculateElevation(pixel);
		offset = (Math.max(pixelY - 1, 0) * width + pixelX) * 4;
		pixel[0] = elevationData[offset];
		pixel[1] = elevationData[offset + 1];
		pixel[2] = elevationData[offset + 2];
		pixel[3] = elevationData[offset + 3];
		const topElevation = calculateElevation(pixel);
		offset = (Math.min(pixelY + 1, height - 1) * width + pixelX) * 4;
		pixel[0] = elevationData[offset];
		pixel[1] = elevationData[offset + 1];
		pixel[2] = elevationData[offset + 2];
		pixel[3] = elevationData[offset + 3];
		const bottomElevation = calculateElevation(pixel);
		offset = (pixelY * width + pixelX) * 4;
		pixel[0] = elevationData[offset];
		pixel[1] = elevationData[offset + 1];
		pixel[2] = elevationData[offset + 2];
		pixel[3] = elevationData[offset + 3];
		const centerElevation = calculateElevation(pixel);
		if (leftElevation !== void 0 && rightElevation !== void 0 && topElevation !== void 0 && bottomElevation !== void 0 && centerElevation !== void 0) {
			const contour = Math.floor(centerElevation / interval);
			if (contour !== Math.floor(leftElevation / interval) || contour !== Math.floor(rightElevation / interval) || contour !== Math.floor(topElevation / interval) || contour !== Math.floor(bottomElevation / interval)) if (centerElevation > 0 && leftElevation > 0 && rightElevation > 0 && topElevation > 0 && bottomElevation > 0) {
				contourData[offset] = 224;
				contourData[offset + 1] = 148;
				contourData[offset + 2] = 94;
				contourData[offset + 3] = 255;
			} else {
				contourData[offset] = 0;
				contourData[offset + 1] = 169;
				contourData[offset + 2] = 202;
				contourData[offset + 3] = 255;
			}
		}
	}
	return {
		data: contourData,
		width,
		height
	};
};
var contourSource = new RasterSource({
	sources: [elevation1],
	operationType: "image",
	operation: contours,
	lib: { calculateElevation },
	resolutions: null
});
contourSource.on("beforeoperations", function(event) {
	const data = event.data;
	if (event.resolution < 5) data.interval = 10;
	else if (event.resolution < 25) data.interval = 50;
	else if (event.resolution < 50) data.interval = 100;
	else if (event.resolution < 250) data.interval = 500;
	else data.interval = 1e3;
});
var contourLayer = new ImageLayer({
	source: contourSource,
	opacity: .5
});
var elevationLayer = new ImageLayer({
	source: new RasterSource({
		sources: [elevation2],
		operation: function(pixels) {
			return pixels[0];
		},
		resolutions: null
	}),
	opacity: 0
});
var dataLayer = new WebGLTileLayer({
	source,
	style: { color: [
		"array",
		0,
		0,
		0,
		0
	] }
});
dataLayer.once("postrender", function(event) {
	if (!event.context.getSupportedExtensions().includes("OES_texture_float_linear")) alert("Device does not support float interpolation");
});
var map = new Map({
	layers: [
		new WebGLTileLayer({ source: new OSM() }),
		dataLayer,
		contourLayer,
		elevationLayer
	],
	target: "map",
	view: new View({
		center: fromLonLat([-78.8175, -1.469167]),
		zoom: 17,
		maxZoom: 21
	})
});
var mousePositionControl = new MousePosition({
	className: "custom-mouse-position",
	target: "info",
	wrapX: false,
	coordinateFormat: function(coordinate) {
		let position = "Position " + toStringHDMS(toLonLat(coordinate)) + "<br>";
		let pixel = elevationLayer.getData(map.getPixelFromCoordinate(coordinate));
		if (pixel) {
			const elevation = calculateElevation(pixel);
			if (elevation !== void 0) position += "Elevation " + elevation.toFixed(1) + " meters";
		}
		position += "<br><br>";
		pixel = dataLayer.getData(map.getPixelFromCoordinate(coordinate));
		if (pixel) {
			const elevation = calculateElevationFromData(pixel);
			if (elevation !== void 0) position += "Data value " + elevation.toFixed(1) + " meters";
		}
		position += "<br>";
		return position;
	},
	placeholder: "<br><br><br><br>"
});
map.addControl(mousePositionControl);
//#endregion

//# sourceMappingURL=contour-interpolation.js.map