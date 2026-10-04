import { Cr as fromLonLat, Mn as Map, jn as TileLayer, or as View, yn as StadiaMaps } from "./common.js";
//#region examples/stadia-maps.js
new Map({
	layers: [new TileLayer({ source: new StadiaMaps({
		layer: "alidade_smooth_dark",
		retina: true
	}) })],
	target: "map",
	view: new View({
		center: fromLonLat([24.750645, 59.444351]),
		zoom: 14
	})
});
//#endregion

//# sourceMappingURL=stadia-maps.js.map