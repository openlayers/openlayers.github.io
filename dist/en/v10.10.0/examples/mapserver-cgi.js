import { Gr as getCenter, Mn as Map, O as createLoader, ln as ImageSource, or as View, un as ImageLayer } from "./common.js";
//#region examples/mapserver-cgi.js
var mapserverUrl = "https://demo.mapserver.org/cgi-bin/mapserv?";
var bounds = [
	388039,
	5234969,
	500964,
	5295764
];
new Map({
	layers: [new ImageLayer({
		extent: bounds,
		source: new ImageSource({ loader: createLoader({
			url: mapserverUrl,
			params: {
				"map": "/mapserver/apps/itasca_legend/map/itasca3.map",
				"layers": "boundaries water roads other cities"
			}
		}) })
	})],
	target: "map",
	view: new View({
		center: getCenter(bounds),
		zoom: 10
	})
});
//#endregion

//# sourceMappingURL=mapserver-cgi.js.map