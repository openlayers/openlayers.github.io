import { Bt as register, Cn as OSM, Ht as WebGLTileLayer, It as proj4, Mn as Map, or as View, s as STACLayer } from "./common.js";
//#region examples/stac-item.js
register(proj4);
var layer = new STACLayer({ url: "https://s3.us-west-2.amazonaws.com/sentinel-cogs/sentinel-s2-l2a-cogs/10/T/ES/2022/7/S2A_10TES_20220726_0_L2A/S2A_10TES_20220726_0_L2A.json" });
var map = new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source: new OSM() }), layer],
	view: new View({
		center: [0, 0],
		zoom: 0
	})
});
layer.on("sourceready", () => {
	map.getView().fit(layer.getExtent());
});
//#endregion

//# sourceMappingURL=stac-item.js.map