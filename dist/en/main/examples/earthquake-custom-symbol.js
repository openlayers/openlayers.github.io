import { Fn as Stroke, In as Icon, Jr as getTopRight, Ln as Fill, Mn as Map, Pn as Style, Wr as getBottomLeft, Zr as DEVICE_PIXEL_RATIO, bn as VectorLayer, dn as VectorSource, fr as Polygon, jn as TileLayer, lt as toContext, or as View, tn as KML, yn as StadiaMaps } from "./common.js";
//#region examples/earthquake-custom-symbol.js
var getSymbolOutline = (function() {
	const path = [
		[0, 0],
		[4, 2],
		[6, 0],
		[10, 5],
		[6, 3],
		[4, 5],
		[0, 0]
	];
	const symbolOutline = new Polygon([path]);
	symbolOutline.rotate(1.2, path[0]);
	return function(scale, offset) {
		const outline = symbolOutline.clone();
		outline.scale(scale, scale, path[0]);
		const origin = getBottomLeft(outline.getExtent());
		outline.translate(offset - origin[0], offset - origin[1]);
		return outline;
	};
})();
var styleCache = {};
var vector = new VectorLayer({
	source: new VectorSource({
		url: "data/kml/2012_Earthquakes_Mag5.kml",
		format: new KML({ extractStyles: false })
	}),
	style: function(feature) {
		const magnitude = feature.get("magnitude");
		let style = styleCache[magnitude];
		if (!style) {
			const scale = 1 + 4 * (magnitude - 5);
			const lineWidth = 2;
			const outline = getSymbolOutline(scale, Math.ceil(lineWidth / 2));
			const canvas = document.createElement("canvas");
			const vectorContext = toContext(canvas.getContext("2d"), {
				size: getTopRight(outline.getExtent()).map((n) => Math.ceil(n + lineWidth / 2)),
				pixelRatio: DEVICE_PIXEL_RATIO
			});
			vectorContext.setStyle(new Style({
				fill: new Fill({ color: "rgba(255, 153, 0, 0.4)" }),
				stroke: new Stroke({
					color: "rgba(255, 204, 0, 0.2)",
					width: 2
				})
			}));
			vectorContext.drawGeometry(outline);
			style = new Style({ image: new Icon({
				img: canvas,
				scale: 1 / DEVICE_PIXEL_RATIO
			}) });
			styleCache[magnitude] = style;
		}
		return style;
	}
});
function parseMagnitudeFromName(name) {
	return parseFloat(name.substr(2));
}
vector.getSource().on("featuresloadend", function(evt) {
	evt.features.forEach((f) => {
		f.set("magnitude", parseMagnitudeFromName(f.get("name")), true);
	});
});
new Map({
	layers: [new TileLayer({ source: new StadiaMaps({ layer: "stamen_toner" }) }), vector],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=earthquake-custom-symbol.js.map