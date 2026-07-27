import { G as Modify, Gt as Draw, Mn as Map, W as Snap, bn as VectorLayer, dn as VectorSource, or as View } from "./common.js";
//#region examples/snap-custom-segmenter.js
var vector = new VectorLayer({
	background: "#333",
	source: new VectorSource(),
	style: { "stroke-color": "#ffcc33" }
});
var map = new Map({
	layers: [vector],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 4
	})
});
var modify = new Modify({ source: vector.getSource() });
map.addInteraction(modify);
var draw = new Draw({
	source: vector.getSource(),
	type: "LineString"
});
map.addInteraction(draw);
var snap = new Snap({
	source: vector.getSource(),
	segmenters: { LineString: (geometry) => {
		const segments = [];
		geometry.forEachSegment((c1, c2) => {
			segments.push([c1, c2], [[(c1[0] + c2[0]) / 2, (c1[1] + c2[1]) / 2]]);
		});
		return segments;
	} }
});
map.addInteraction(snap);
//#endregion

//# sourceMappingURL=snap-custom-segmenter.js.map