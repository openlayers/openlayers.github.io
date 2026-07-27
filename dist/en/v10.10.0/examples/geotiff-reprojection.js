import { Ht as WebGLTileLayer, Mn as Map, Or as transform, Rt as GeoTIFFSource, or as View } from "./common.js";
//#region examples/geotiff-reprojection.js
var source = new GeoTIFFSource({ sources: [{ url: "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif" }] });
var map = new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source })],
	view: new View({
		center: [0, 0],
		zoom: 12
	})
});
source.getView().then((sourceView) => {
	const view = map.getView();
	const center = transform(sourceView.center, sourceView.projection, view.getProjection());
	view.setCenter(center);
});
//#endregion

//# sourceMappingURL=geotiff-reprojection.js.map