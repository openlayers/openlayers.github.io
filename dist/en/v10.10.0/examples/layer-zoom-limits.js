import { Cn as OSM, Cr as fromLonLat, Mn as Map, jn as TileLayer, or as View, wt as TileJSON } from "./common.js";
//#region examples/layer-zoom-limits.js
new Map({
	target: "map",
	layers: [new TileLayer({
		maxZoom: 14,
		source: new OSM()
	}), new TileLayer({
		minZoom: 14,
		source: new TileJSON({
			url: "https://api.maptiler.com/maps/outdoor-v2/tiles.json?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
			tileSize: 512
		})
	})],
	view: new View({
		center: fromLonLat([-112.18688965, 36.057944835]),
		zoom: 15,
		maxZoom: 18,
		constrainOnlyCenter: true
	})
});
//#endregion

//# sourceMappingURL=layer-zoom-limits.js.map