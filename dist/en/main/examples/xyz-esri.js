import { Ar as useGeographic, Ht as WebGLTileLayer, Mn as Map, an as ImageTileSource, or as View } from "./common.js";
//#region examples/xyz-esri.js
useGeographic();
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source: new ImageTileSource({
		attributions: "Tiles © <a href=\"https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer\">ArcGIS</a>",
		url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
	}) })],
	view: new View({
		center: [-121.1, 47.5],
		zoom: 7
	})
});
//#endregion

//# sourceMappingURL=xyz-esri.js.map