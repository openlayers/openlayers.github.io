import { Dt as OGCMapTile, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/ogc-map-tiles.js
new Map({
	target: "map",
	layers: [new TileLayer({ source: new OGCMapTile({ url: "https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WebMercatorQuad" }) })],
	view: new View({
		center: [0, 0],
		zoom: 1
	})
});
//#endregion

//# sourceMappingURL=ogc-map-tiles.js.map