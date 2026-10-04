import { r as __toESM } from "./rolldown-runtime.js";
import { Dn as createXYZ, F as WebGLVectorLayer, Mn as Map, On as wrapX, Or as transform, Zr as DEVICE_PIXEL_RATIO, dn as VectorSource, n as require_colormap, on as DataTileSource, or as View, rn as GeoJSON, t as FlowLayer, wr as get } from "./common.js";
//#region examples/wind.js
var import_colormap = /* @__PURE__ */ __toESM(require_colormap(), 1);
var windData = new Promise((resolve, reject) => {
	const image = new Image();
	image.onload = () => {
		const canvas = document.createElement("canvas");
		const width = image.width;
		const height = image.height;
		canvas.width = width;
		canvas.height = height;
		const context = canvas.getContext("2d");
		context.drawImage(image, 0, 0);
		const data = context.getImageData(0, 0, width, height).data;
		resolve({
			data,
			width,
			height
		});
	};
	image.onerror = () => {
		reject(/* @__PURE__ */ new Error("failed to load"));
	};
	image.src = "./data/wind.png";
});
function bilinearInterpolation(xAlong, yAlong, v11, v21, v12, v22) {
	const q11 = (1 - xAlong) * (1 - yAlong) * v11;
	const q21 = xAlong * (1 - yAlong) * v21;
	const q12 = (1 - xAlong) * yAlong * v12;
	const q22 = xAlong * yAlong * v22;
	return q11 + q21 + q12 + q22;
}
function interpolatePixels(xAlong, yAlong, p11, p21, p12, p22) {
	return p11.map((_, i) => bilinearInterpolation(xAlong, yAlong, p11[i], p21[i], p12[i], p22[i]));
}
var dataTileGrid = createXYZ();
var dataTileSize = 256;
var inputImageProjection = get("EPSG:4326");
var dataTileProjection = get("EPSG:3857");
var inputBands = 4;
var dataBands = 3;
var minU = -21.32;
var deltaU = 26.8 - minU;
var minV = -21.57;
var deltaV = 21.42 - minV;
var wind = new DataTileSource({
	transition: 0,
	wrapX: true,
	async loader(z, x, y) {
		const { data: inputData, width: inputWidth, height: inputHeight } = await windData;
		const tileCoord = wrapX(dataTileGrid, [
			z,
			x,
			y
		], dataTileProjection);
		const extent = dataTileGrid.getTileCoordExtent(tileCoord);
		const resolution = dataTileGrid.getResolution(z);
		const data = new Float32Array(dataTileSize * dataTileSize * dataBands);
		for (let row = 0; row < dataTileSize; ++row) {
			let offset = row * dataTileSize * dataBands;
			const mapY = extent[3] - row * resolution;
			for (let col = 0; col < dataTileSize; ++col) {
				const [lon, lat] = transform([extent[0] + col * resolution, mapY], dataTileProjection, inputImageProjection);
				const x = inputWidth * (lon + 180) / 360;
				let x1 = Math.floor(x);
				let x2 = Math.ceil(x);
				const xAlong = x - x1;
				if (x1 < 0) x1 += inputWidth;
				if (x2 >= inputWidth) x2 -= inputWidth;
				const y = inputHeight * (90 - lat) / 180;
				let y1 = Math.floor(y);
				let y2 = Math.ceil(y);
				const yAlong = y - y1;
				if (y1 < 0) y1 = 0;
				if (y2 >= inputHeight) y2 = inputHeight - 1;
				const interpolated = interpolatePixels(xAlong, yAlong, ...[
					[x1, y1],
					[x2, y1],
					[x1, y2],
					[x2, y2]
				].map(([cx, cy]) => {
					const inputOffset = (cy * 360 + cx) * inputBands;
					return [inputData[inputOffset], inputData[inputOffset + 1]];
				}));
				const u = minU + deltaU * interpolated[0] / 255;
				const v = minV + deltaV * interpolated[1] / 255;
				data[offset] = u;
				data[offset + 1] = v;
				offset += dataBands;
			}
		}
		return data;
	}
});
var maxSpeed = 20;
var colors = (0, import_colormap.default)({
	colormap: "viridis",
	nshades: 10,
	alpha: .75,
	format: "rgba"
});
var colorStops = [];
for (let i = 0; i < colors.length; ++i) {
	colorStops.push(i * maxSpeed / (colors.length - 1));
	colorStops.push(colors[i]);
}
new Map({
	target: "map",
	pixelRatio: Math.min(DEVICE_PIXEL_RATIO, 2),
	layers: [new WebGLVectorLayer({
		source: new VectorSource({
			url: "https://openlayers.org/data/vector/ocean.json",
			format: new GeoJSON()
		}),
		style: { "fill-color": "#555555" }
	}), new FlowLayer({
		source: wind,
		maxSpeed,
		style: { color: [
			"interpolate",
			["linear"],
			["get", "speed"],
			...colorStops
		] }
	})],
	view: new View({
		center: [0, 0],
		zoom: 0
	})
});
//#endregion

//# sourceMappingURL=wind.js.map