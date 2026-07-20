import { Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, Z as GPX, an as ImageTileSource, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/gpx.js
var raster = new TileLayer({ source: new ImageTileSource({
	attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
	url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	tileSize: 512,
	maxZoom: 20
}) });
var style = {
	"Point": new Style({ image: new CircleStyle({
		fill: new Fill({ color: "rgba(255,255,0,0.4)" }),
		radius: 5,
		stroke: new Stroke({
			color: "#ff0",
			width: 1
		})
	}) }),
	"LineString": new Style({ stroke: new Stroke({
		color: "#f00",
		width: 3
	}) }),
	"MultiLineString": new Style({ stroke: new Stroke({
		color: "#0f0",
		width: 3
	}) })
};
var map = new Map({
	layers: [raster, new VectorLayer({
		source: new VectorSource({
			url: "data/gpx/fells_loop.gpx",
			format: new GPX()
		}),
		style: function(feature) {
			return style[feature.getGeometry().getType()];
		}
	})],
	target: document.getElementById("map"),
	view: new View({
		center: [-7916041.528716288, 5228379.045749711],
		zoom: 12
	})
});
var displayFeatureInfo = function(pixel) {
	const features = [];
	map.forEachFeatureAtPixel(pixel, function(feature) {
		features.push(feature);
	});
	if (features.length > 0) {
		const info = [];
		let i, ii;
		for (i = 0, ii = features.length; i < ii; ++i) info.push(features[i].get("desc"));
		document.getElementById("info").innerHTML = info.join(", ") || "(unknown)";
		map.getTargetElement().style.cursor = "pointer";
	} else {
		document.getElementById("info").innerHTML = "&nbsp;";
		map.getTargetElement().style.cursor = "";
	}
};
map.on("pointermove", function(evt) {
	if (evt.dragging) return;
	displayFeatureInfo(evt.pixel);
});
map.on("click", function(evt) {
	displayFeatureInfo(evt.pixel);
});
//#endregion

//# sourceMappingURL=gpx.js.map