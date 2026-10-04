import { Mn as Map, an as ImageTileSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/xyz.js
new Map({
	target: "map",
	layers: [new TileLayer({ source: new ImageTileSource({ url: "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0e6fc415256d4fbb9b5166a718591d71" }) })],
	view: new View({
		center: [-472202, 7530279],
		zoom: 12
	})
});
//#endregion

//# sourceMappingURL=xyz.js.map