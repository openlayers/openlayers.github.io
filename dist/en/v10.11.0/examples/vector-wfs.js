import { Mn as Map, _n as bbox, an as ImageTileSource, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON } from "./common.js";
//#region examples/vector-wfs.js
var vector = new VectorLayer({
	source: new VectorSource({
		format: new GeoJSON(),
		url: function(extent) {
			return "https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=osm:water_areas&outputFormat=application/json&srsname=EPSG:3857&bbox=" + extent.join(",") + ",EPSG:3857";
		},
		strategy: bbox
	}),
	style: {
		"stroke-width": .75,
		"stroke-color": "white",
		"fill-color": "rgba(100,100,100,0.25)"
	}
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
		center: [-8908887.277395891, 5381918.072437216],
		maxZoom: 19,
		zoom: 12
	})
});
//#endregion

//# sourceMappingURL=vector-wfs.js.map