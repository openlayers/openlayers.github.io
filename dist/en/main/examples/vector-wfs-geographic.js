import { Ar as useGeographic, Dn as createXYZ, Fn as Stroke, Mn as Map, Pn as Style, an as ImageTileSource, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON, vn as tile } from "./common.js";
//#region examples/vector-wfs-geographic.js
useGeographic();
var vector = new VectorLayer({
	source: new VectorSource({
		format: new GeoJSON(),
		url: function(extent) {
			return "https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=osm:water_areas&outputFormat=application/json&srsname=EPSG:4326&bbox=" + extent.join(",") + ",EPSG:4326";
		},
		strategy: tile(createXYZ({ tileSize: 512 }))
	}),
	style: new Style({ stroke: new Stroke({
		color: "rgba(0, 0, 255, 1.0)",
		width: 2
	}) })
});
new Map({
	layers: [new TileLayer({ source: new ImageTileSource({
		attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
		url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
		tileSize: 512,
		maxZoom: 20
	}) }), vector],
	target: document.getElementById("map"),
	view: new View({
		center: [-80.0298, 43.4578],
		maxZoom: 19,
		zoom: 12
	})
});
//#endregion

//# sourceMappingURL=vector-wfs-geographic.js.map