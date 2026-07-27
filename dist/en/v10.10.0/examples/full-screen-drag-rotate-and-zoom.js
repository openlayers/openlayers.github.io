import { K as DragRotateAndZoom, L as FullScreen, Mn as Map, Wn as defaults$1, an as ImageTileSource, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/full-screen-drag-rotate-and-zoom.js
new Map({
	controls: defaults().extend([new FullScreen()]),
	interactions: defaults$1().extend([new DragRotateAndZoom()]),
	layers: [new TileLayer({ source: new ImageTileSource({
		attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
		url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
		tileSize: 512,
		maxZoom: 20
	}) })],
	target: "map",
	view: new View({
		center: [-33519607, 5616436],
		rotation: -Math.PI / 8,
		zoom: 8
	})
});
//#endregion

//# sourceMappingURL=full-screen-drag-rotate-and-zoom.js.map