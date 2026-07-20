import { Cn as OSM, Mn as Map, Xt as CartoDB, jn as TileLayer, or as View } from "./common.js";
//#region examples/cartodb.js
var mapConfig = { "layers": [{
	"type": "cartodb",
	"options": {
		"cartocss_version": "2.1.1",
		"cartocss": "#layer { polygon-fill: #F00; }"
	}
}] };
function setArea(n) {
	mapConfig.layers[0].options.sql = "select * from european_countries_e where area > " + n;
}
var areaSelect = document.getElementById("country-area");
setArea(areaSelect.value);
var cartoDBSource = new CartoDB({
	account: "documentation",
	config: mapConfig
});
areaSelect.addEventListener("change", function() {
	setArea(this.value);
	cartoDBSource.setConfig(mapConfig);
});
new Map({
	layers: [new TileLayer({ source: new OSM() }), new TileLayer({ source: cartoDBSource })],
	target: "map",
	view: new View({
		center: [85e5, 85e5],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=cartodb.js.map