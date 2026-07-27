import { Mn as Map, Nt as Zoomify, jn as TileLayer, or as View } from "./common.js";
//#region examples/zoomify.js
var imgWidth = 4e3;
var imgHeight = 3e3;
var zoomifyUrl = "https://ol-zoomify.surge.sh/zoomify/";
var source = new Zoomify({
	url: zoomifyUrl,
	size: [imgWidth, imgHeight],
	crossOrigin: "anonymous",
	zDirection: -1
});
var extent = source.getTileGrid().getExtent();
var retinaPixelRatio = 2;
var retinaSource = new Zoomify({
	url: zoomifyUrl,
	size: [imgWidth, imgHeight],
	crossOrigin: "anonymous",
	zDirection: -1,
	tilePixelRatio: retinaPixelRatio,
	tileSize: 256 / retinaPixelRatio
});
var layer = new TileLayer({ source });
new Map({
	layers: [layer],
	target: "map",
	view: new View({
		resolutions: layer.getSource().getTileGrid().getResolutions(),
		extent,
		constrainOnlyCenter: true
	})
}).getView().fit(extent);
document.getElementById("zoomifyProtocol").addEventListener("change", function(event) {
	const value = event.currentTarget.value;
	if (value === "zoomify") layer.setSource(source);
	else if (value === "zoomifyretina") layer.setSource(retinaSource);
});
//#endregion

//# sourceMappingURL=zoomify.js.map