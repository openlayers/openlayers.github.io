import { Ht as WebGLTileLayer, Mn as Map, Rt as GeoTIFFSource } from "./common.js";
//#region examples/cog-blob.js
fetch("data/example.tif").then((response) => response.blob()).then((blob) => {
	const source = new GeoTIFFSource({ sources: [{ blob }] });
	new Map({
		target: "map",
		layers: [new WebGLTileLayer({ source })],
		view: source.getView().then((viewConfig) => {
			viewConfig.showFullExtent = true;
			return viewConfig;
		})
	});
});
//#endregion

//# sourceMappingURL=cog-blob.js.map