import { r as __toESM } from "./rolldown-runtime.js";
import { Cn as OSM, Gt as Draw, Mn as Map, Yt as require_chaikin_smooth, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/chaikin.js
var import_chaikin_smooth = /* @__PURE__ */ __toESM(require_chaikin_smooth(), 1);
function makeSmooth(path, numIterations) {
	numIterations = Math.min(Math.max(numIterations, 1), 10);
	while (numIterations > 0) {
		path = (0, import_chaikin_smooth.default)(path);
		numIterations--;
	}
	return path;
}
var vectorSource = new VectorSource({});
var map = new Map({
	layers: [new TileLayer({
		source: new OSM(),
		opacity: .5
	}), new VectorLayer({ source: vectorSource })],
	target: "map",
	view: new View({
		center: [1078373.595, 6871994.591],
		zoom: 5
	})
});
var shallSmoothen = document.getElementById("shall-smoothen");
var numIterations = document.getElementById("iterations");
var draw = new Draw({
	source: vectorSource,
	type: "LineString"
});
map.addInteraction(draw);
draw.on("drawend", function(event) {
	if (!shallSmoothen.checked) return;
	const geometry = event.feature.getGeometry();
	const smoothened = makeSmooth(geometry.getCoordinates(), parseInt(numIterations.value, 10) || 5);
	geometry.setCoordinates(smoothened);
});
//#endregion

//# sourceMappingURL=chaikin.js.map