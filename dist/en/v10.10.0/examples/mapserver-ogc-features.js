import { Cn as OSM, Mn as Map, _n as bbox, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON } from "./common.js";
//#region examples/mapserver-ogc-features.js
var mapServerUrl = `https://demo.mapserver.org/cgi-bin/mapserv/localdemo/ogcapi/collections/lakes/items`;
var params = `f=json&limit=1000`;
var layer = new VectorLayer({
	style: {
		"fill-color": "rgba(70, 130, 180, 0.6)",
		"stroke-color": "rgba(25, 25, 112, 1)",
		"stroke-width": 2
	},
	source: new VectorSource({
		url: function(extent) {
			return `${mapServerUrl}?${params}&bbox=${extent.join(",")}`;
		},
		strategy: bbox,
		format: new GeoJSON()
	})
});
new Map({
	layers: [new TileLayer({
		className: "bw",
		source: new OSM()
	}), layer],
	target: "map",
	view: new View({
		projection: "EPSG:3857",
		center: [0, 0],
		zoom: 4
	})
});
//#endregion

//# sourceMappingURL=mapserver-ogc-features.js.map