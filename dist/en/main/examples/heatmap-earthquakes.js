import { H as Heatmap, Mn as Map, dn as VectorSource, jn as TileLayer, or as View, tn as KML, yn as StadiaMaps } from "./common.js";
//#region examples/heatmap-earthquakes.js
var blur = document.getElementById("blur");
var radius = document.getElementById("radius");
var vector = new Heatmap({
	source: new VectorSource({
		url: "data/kml/2012_Earthquakes_Mag5.kml",
		format: new KML({ extractStyles: false })
	}),
	blur: parseInt(blur.value, 10),
	radius: parseInt(radius.value, 10),
	weight: function(feature) {
		const name = feature.get("name");
		return parseFloat(name.substr(2)) - 5;
	}
});
new Map({
	layers: [new TileLayer({ source: new StadiaMaps({ layer: "stamen_toner" }) }), vector],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
blur.addEventListener("input", function() {
	vector.setBlur(parseInt(blur.value, 10));
});
radius.addEventListener("input", function() {
	vector.setRadius(parseInt(radius.value, 10));
});
//#endregion

//# sourceMappingURL=heatmap-earthquakes.js.map