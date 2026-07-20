import { Dt as OGCMapTile, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/ogc-map-tiles-geographic.js
new Map({
	target: "map",
	layers: [new TileLayer({ source: new OGCMapTile({ url: "https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WorldCRS84Quad" }) })],
	view: new View({
		projection: "EPSG:4326",
		center: [0, 0],
		zoom: 1
	})
});
//#endregion

//# sourceMappingURL=ogc-map-tiles-geographic.js.map