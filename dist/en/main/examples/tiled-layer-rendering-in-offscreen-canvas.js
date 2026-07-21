import { Mn as Map, an as ImageTileSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/tiled-layer-rendering-in-offscreen-canvas.js
var worker = new Worker(new URL(
	/* @vite-ignore */
	"/assets/tiled-layer-rendering-in-offscreen-canvas.worker-CWCdeLvt.js",
	"" + import.meta.url
), { type: "module" });
var tileQueue = [];
new Map({
	layers: [new TileLayer({ source: new ImageTileSource({
		tileSize: 512,
		loader: (z, x, y) => {
			return new Promise((resolve) => {
				const loadTile = () => {
					const handleMessage = ({ data: { action, imageData } }) => {
						if (action !== "rendered") return;
						worker.removeEventListener("message", handleMessage);
						resolve(imageData);
						tileQueue.shift();
						const loadNextTile = tileQueue[0];
						loadNextTile?.();
					};
					worker.addEventListener("message", handleMessage);
					worker.postMessage({
						action: "render",
						tile: [
							z,
							x,
							y
						]
					});
				};
				if (tileQueue.length === 0) loadTile();
				tileQueue.push(loadTile);
			});
		},
		attributions: ["<a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">© OpenStreetMap contributors</a>"]
	}) })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=tiled-layer-rendering-in-offscreen-canvas.js.map