import { A as OL3Parser, Cn as OSM, Cr as fromLonLat, Mn as Map, bn as VectorLayer, dn as VectorSource, fr as Polygon, gn as LineString, gr as LinearRing, hn as MultiLineString, hr as Point, jn as TileLayer, k as BufferOp, mn as MultiPoint, or as View, pn as MultiPolygon, rn as GeoJSON } from "./common.js";
//#region examples/jsts.js
var source = new VectorSource();
fetch("data/geojson/roads-seoul.geojson").then(function(response) {
	return response.json();
}).then(function(json) {
	const features = new GeoJSON().readFeatures(json, { featureProjection: "EPSG:3857" });
	const parser = new OL3Parser(void 0, void 0);
	parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
	for (let i = 0; i < features.length; i++) {
		const feature = features[i];
		const jstsGeom = parser.read(feature.getGeometry());
		const buffered = BufferOp.bufferOp(jstsGeom, 40);
		feature.setGeometry(parser.write(buffered));
	}
	source.addFeatures(features);
});
var vectorLayer = new VectorLayer({ source });
new Map({
	layers: [new TileLayer({ source: new OSM() }), vectorLayer],
	target: document.getElementById("map"),
	view: new View({
		center: fromLonLat([126.979293, 37.528787]),
		zoom: 15
	})
});
//#endregion

//# sourceMappingURL=jsts.js.map