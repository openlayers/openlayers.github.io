import { Ht as WebGLTileLayer, Mn as Map, Rt as GeoTIFFSource } from "./common.js";
//#region examples/cog-overviews.js
var source = new GeoTIFFSource({ sources: [{
	url: "https://openlayers.org/data/raster/no-overviews.tif",
	overviews: ["https://openlayers.org/data/raster/no-overviews.ovr.tif"]
}] });
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source })],
	view: source.getView()
});
//#endregion

//# sourceMappingURL=cog-overviews.js.map