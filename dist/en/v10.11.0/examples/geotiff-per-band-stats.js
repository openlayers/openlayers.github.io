import { Ht as WebGLTileLayer, Mn as Map, Rt as GeoTIFFSource } from "./common.js";
//#region examples/geotiff-per-band-stats.js
var source = new GeoTIFFSource({ sources: [{
	url: "https://spacenet-dataset.s3.amazonaws.com/spacenet/SN3_roads/train/AOI_3_Paris/PS-RGB/SN3_roads_train_AOI_3_Paris_PS-RGB_img101.tif",
	nodata: 0,
	min: [
		110,
		216,
		217
	],
	max: [
		586,
		579,
		432
	]
}] });
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source })],
	view: source.getView()
});
//#endregion

//# sourceMappingURL=geotiff-per-band-stats.js.map