import { Cn as OSM, Fn as Stroke, Ln as Fill, Mn as Map, Nn as Text, Pn as Style, Qr as Collection, Rn as CircleStyle, bn as VectorLayer, dn as VectorSource, hr as Point, jn as TileLayer, or as View, rn as GeoJSON, xn as Feature } from "./common.js";
//#region examples/vector-labels-justify-text.js
var features = [
	{
		geometry: new Point([-83e5, 6095e3]),
		textAlign: "left"
	},
	{
		geometry: new Point([-815e4, 6095e3]),
		textAlign: "center"
	},
	{
		geometry: new Point([-8e6, 6095e3]),
		textAlign: "right"
	},
	{
		geometry: new Point([-83e5, 6025e3]),
		textAlign: "left",
		justify: "center"
	},
	{
		geometry: new Point([-815e4, 6025e3]),
		textAlign: "center",
		justify: "center"
	},
	{
		geometry: new Point([-8e6, 6025e3]),
		textAlign: "right",
		justify: "center"
	},
	{
		geometry: new Point([-83e5, 5955e3]),
		textAlign: "left",
		justify: "left"
	},
	{
		geometry: new Point([-815e4, 5955e3]),
		textAlign: "center",
		justify: "left"
	},
	{
		geometry: new Point([-8e6, 5955e3]),
		textAlign: "right",
		justify: "left"
	}
];
function createStyle({ textAlign, justify = void 0 }) {
	return new Style({
		image: new CircleStyle({
			radius: 10,
			fill: new Fill({ color: "rgba(255, 0, 0, 0.1)" }),
			stroke: new Stroke({
				color: "red",
				width: 1
			})
		}),
		text: new Text({
			font: "16px sans-serif",
			textAlign,
			justify,
			text: `Justify text inside box\ntextAlign: ${textAlign}` + (justify ? `\njustify: ${justify}` : ""),
			fill: new Fill({ color: [
				255,
				255,
				255,
				1
			] }),
			backgroundFill: new Fill({ color: [
				168,
				50,
				153,
				.6
			] }),
			padding: [
				2,
				2,
				2,
				2
			]
		})
	});
}
var vectorPoints = new VectorLayer({ source: new VectorSource({
	features: new Collection(features.map((featureOptions) => {
		const feature = new Feature({ geometry: featureOptions.geometry });
		feature.setStyle(createStyle(featureOptions));
		return feature;
	})),
	format: new GeoJSON()
}) });
new Map({
	layers: [new TileLayer({ source: new OSM() }), vectorPoints],
	target: "map",
	view: new View({
		center: [-815e4, 6025e3],
		zoom: 8
	})
});
//#endregion

//# sourceMappingURL=vector-labels-justify-text.js.map