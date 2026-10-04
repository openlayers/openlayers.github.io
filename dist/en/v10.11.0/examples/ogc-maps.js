import { Mn as Map, or as View, un as ImageLayer, w as OGCMap } from "./common.js";
//#region examples/ogc-maps.js
new Map({
	target: "map",
	layers: [new ImageLayer({ source: new OGCMap({ url: "https://maps.gnosis.earth/ogcapi/collections/blueMarble/map" }) })],
	view: new View({
		center: [0, 0],
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=ogc-maps.js.map