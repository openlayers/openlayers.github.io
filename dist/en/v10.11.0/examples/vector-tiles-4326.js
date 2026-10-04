import { $t as VectorTileLayer, Dn as createXYZ, Mn as Map, Zt as VectorTile, it as applyStyle, or as View, rt as applyBackground } from "./common.js";
//#region examples/vector-tiles-4326.js
var url = "https://api.maptiler.com/maps/basic-4326/style.json?key=get_your_own_D6rA4zTHduk6KOKTXzGB";
var tileGrid = createXYZ({
	extent: [
		-180,
		-90,
		180,
		90
	],
	tileSize: 512,
	maxResolution: 180 / 512,
	maxZoom: 13
});
var layer = new VectorTileLayer({
	declutter: true,
	source: new VectorTile({
		projection: "EPSG:4326",
		tileGrid
	})
});
applyStyle(layer, url, { resolutions: tileGrid.getResolutions() });
applyBackground(layer, url);
new Map({
	target: "map",
	layers: [layer],
	view: new View({
		projection: "EPSG:4326",
		zoom: 0,
		center: [0, 30]
	})
});
//#endregion

//# sourceMappingURL=vector-tiles-4326.js.map