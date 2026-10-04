import { Ar as useGeographic, Ht as WebGLTileLayer, Mn as Map, an as ImageTileSource, or as View } from "./common.js";
//#region examples/xyz-retina.js
useGeographic();
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source: new ImageTileSource({
		attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
		url: "https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}@2x.png?key=get_your_own_D6rA4zTHduk6KOKTXzGB"
	}) })],
	view: new View({
		center: [-112.21324137318899, 36.105337765976756],
		zoom: 13
	})
});
//#endregion

//# sourceMappingURL=xyz-retina.js.map