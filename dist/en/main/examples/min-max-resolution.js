import { Cn as OSM, Mn as Map, jn as TileLayer, or as View, wt as TileJSON } from "./common.js";
//#region examples/min-max-resolution.js
new Map({
	layers: [new TileLayer({
		source: new OSM(),
		minResolution: 200,
		maxResolution: 2e3
	}), new TileLayer({
		source: new TileJSON({
			url: "https://api.tiles.mapbox.com/v4/mapbox.natural-earth-hypso-bathy.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ",
			crossOrigin: "anonymous"
		}),
		minResolution: 2e3,
		maxResolution: 2e4
	})],
	target: "map",
	view: new View({
		center: [653600, 5723680],
		zoom: 5
	})
});
//#endregion

//# sourceMappingURL=min-max-resolution.js.map