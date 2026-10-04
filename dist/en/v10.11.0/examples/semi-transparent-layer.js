import { Cn as OSM, Cr as fromLonLat, Mn as Map, jn as TileLayer, or as View, wt as TileJSON } from "./common.js";
//#region examples/semi-transparent-layer.js
new Map({
	layers: [new TileLayer({
		className: "bw",
		source: new OSM()
	}), new TileLayer({ source: new TileJSON({
		url: "https://api.tiles.mapbox.com/v4/mapbox.va-quake-aug.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ",
		crossOrigin: "anonymous",
		transition: 0
	}) })],
	target: "map",
	view: new View({
		center: fromLonLat([-77.93255, 37.9555]),
		zoom: 7
	})
});
//#endregion

//# sourceMappingURL=semi-transparent-layer.js.map