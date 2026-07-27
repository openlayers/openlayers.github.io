import { Cn as OSM, Cr as fromLonLat, Fn as Stroke, Mn as Map, jn as TileLayer, or as View, ot as Graticule } from "./common.js";
//#region examples/graticule.js
new Map({
	layers: [new TileLayer({ source: new OSM({ wrapX: false }) }), new Graticule({
		strokeStyle: new Stroke({
			color: "rgba(255,120,0,0.9)",
			width: 2,
			lineDash: [.5, 4]
		}),
		showLabels: true,
		wrapX: false
	})],
	target: "map",
	view: new View({
		center: fromLonLat([4.8, 47.75]),
		zoom: 5
	})
});
//#endregion

//# sourceMappingURL=graticule.js.map