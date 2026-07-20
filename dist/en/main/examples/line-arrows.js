import { Cn as OSM, Fn as Stroke, Gt as Draw, In as Icon, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, hr as Point, jn as TileLayer, or as View, wr as get } from "./common.js";
//#region examples/line-arrows.js
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource();
var styleFunction = function(feature) {
	const geometry = feature.getGeometry();
	const styles = [new Style({ stroke: new Stroke({
		color: "#ffcc33",
		width: 2
	}) })];
	geometry.forEachSegment(function(start, end) {
		const dx = end[0] - start[0];
		const dy = end[1] - start[1];
		const rotation = Math.atan2(dy, dx);
		styles.push(new Style({
			geometry: new Point(end),
			image: new Icon({
				src: "data/arrow.png",
				anchor: [.75, .5],
				rotateWithView: true,
				rotation: -rotation
			})
		}));
	});
	return styles;
};
var vector = new VectorLayer({
	source,
	style: styleFunction
});
var extent = get("EPSG:3857").getExtent().slice();
extent[0] += extent[0];
extent[2] += extent[2];
new Map({
	layers: [raster, vector],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 4,
		extent
	})
}).addInteraction(new Draw({
	source,
	type: "LineString"
}));
//#endregion

//# sourceMappingURL=line-arrows.js.map