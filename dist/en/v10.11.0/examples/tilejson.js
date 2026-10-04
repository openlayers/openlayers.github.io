import { Mn as Map, jn as TileLayer, or as View, wt as TileJSON } from "./common.js";
//#region examples/tilejson.js
new Map({
	layers: [new TileLayer({ source: new TileJSON({
		url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad?f=tilejson",
		crossOrigin: "anonymous"
	}) })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=tilejson.js.map