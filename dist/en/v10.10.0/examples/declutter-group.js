import { Gr as getCenter, Mn as Map, Un as LayerGroup, bn as VectorLayer, dn as VectorSource, hr as Point, mr as fromExtent, nt as apply, or as View, xn as Feature } from "./common.js";
//#region examples/declutter-group.js
var square = [
	-12e6,
	35e5,
	-1e7,
	55e5
];
var overlay = new VectorLayer({
	declutter: "separate",
	source: new VectorSource({ features: [new Feature({
		geometry: fromExtent(square),
		text: "Polygon above Mapbox styled layers"
	}), new Feature({
		geometry: new Point([-11e6, 43e5]),
		text: "Point above Mapbox styled layers"
	})] }),
	style: {
		"stroke-color": "rgba(180, 180, 255, 1)",
		"stroke-width": 1,
		"fill-color": "rgba(200, 200, 255, 0.85)",
		"text-value": ["get", "text"],
		"text-font": "bold 14px sans-serif",
		"text-offset-y": -12,
		"text-overflow": true,
		"circle-radius": 5,
		"circle-fill-color": "rgba(180, 180, 255, 1)",
		"circle-stroke-color": "rgba(255, 255, 255, 1)"
	}
});
var layer = new LayerGroup();
apply(layer, "https://api.maptiler.com/maps/streets-v2/style.json?key=get_your_own_D6rA4zTHduk6KOKTXzGB");
new Map({
	target: "map",
	view: new View({
		center: getCenter(square),
		zoom: 3.9
	}),
	layers: [layer, overlay]
});
//#endregion

//# sourceMappingURL=declutter-group.js.map