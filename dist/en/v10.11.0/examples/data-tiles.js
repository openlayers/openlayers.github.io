import { Ht as WebGLTileLayer, Mn as Map, on as DataTileSource, or as View } from "./common.js";
//#region examples/data-tiles.js
var size = 256;
var canvas = document.createElement("canvas");
canvas.width = size;
canvas.height = size;
var context = canvas.getContext("2d", { willReadFrequently: true });
context.strokeStyle = "white";
context.textAlign = "center";
context.font = "24px sans-serif";
var lineHeight = 30;
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source: new DataTileSource({
		loader: function(z, x, y) {
			const half = size / 2;
			context.clearRect(0, 0, size, size);
			context.fillStyle = "rgba(100, 100, 100, 0.5)";
			context.fillRect(0, 0, size, size);
			context.fillStyle = "black";
			context.fillText(`z: ${z}`, half, half - lineHeight);
			context.fillText(`x: ${x}`, half, half);
			context.fillText(`y: ${y}`, half, 158);
			context.strokeRect(0, 0, size, size);
			return context.getImageData(0, 0, size, size).data;
		},
		transition: 0
	}) })],
	view: new View({
		center: [0, 0],
		zoom: 0
	})
});
//#endregion

//# sourceMappingURL=data-tiles.js.map