import { Mn as Map, or as View, tt as MapboxVectorLayer } from "./common.js";
//#region examples/mapbox-vector-layer.js
new Map({
	target: "map",
	layers: [new MapboxVectorLayer({
		styleUrl: "mapbox://styles/mapbox/bright-v9",
		accessToken: "pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ"
	})],
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=mapbox-vector-layer.js.map