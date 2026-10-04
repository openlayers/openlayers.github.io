import { Ar as useGeographic, Ht as WebGLTileLayer, Mn as Map, S as w, an as ImageTileSource, or as View } from "./common.js";
//#region examples/pmtiles-image.js
useGeographic();
var tiles = new w("https://pmtiles.io/stamen_toner(raster)CC-BY+ODbL_z3.pmtiles");
/**
* @param {string} src The image source URL.
* @return {Promise<HTMLImageElement>} Resolves with the loaded image.
*/
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.addEventListener("load", () => resolve(img));
		img.addEventListener("error", () => reject(/* @__PURE__ */ new Error("load failed")));
		img.src = src;
	});
}
new Map({
	layers: [new WebGLTileLayer({ source: new ImageTileSource({
		async loader(z, x, y, { signal }) {
			const response = await tiles.getZxy(z, x, y, signal);
			const blob = new Blob([response.data]);
			const src = URL.createObjectURL(blob);
			const image = await loadImage(src);
			URL.revokeObjectURL(src);
			return image;
		},
		attributions: "Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, under <a href=\"http://creativecommons.org/licenses/by/4.0\">CC BY 4.0</a>. Data by <a href=\"http://openstreetmap.org\">OpenStreetMap</a>, under <a href=\"http://www.openstreetmap.org/copyright\">ODbL</a>."
	}) })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2,
		maxZoom: 4
	})
});
//#endregion

//# sourceMappingURL=pmtiles-image.js.map