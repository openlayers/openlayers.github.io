import { Cr as fromLonLat, Mn as Map, jn as TileLayer, or as View, yn as StadiaMaps } from "./common.js";
//#region examples/stamen.js
new Map({
	layers: [new TileLayer({ source: new StadiaMaps({ layer: "stamen_watercolor" }) }), new TileLayer({ source: new StadiaMaps({ layer: "stamen_terrain_labels" }) })],
	target: "map",
	view: new View({
		center: fromLonLat([-122.416667, 37.783333]),
		zoom: 12
	})
});
//#endregion

//# sourceMappingURL=stamen.js.map