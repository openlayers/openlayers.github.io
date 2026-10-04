import { Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, hr as Point, or as View, xn as Feature, zn as RegularShape } from "./common.js";
//#region examples/regularshape.js
var stroke = new Stroke({
	color: "black",
	width: 2
});
var fill = new Fill({ color: "red" });
var styles = {
	"square": new Style({ image: new RegularShape({
		fill,
		stroke,
		points: 4,
		radius: 10,
		angle: Math.PI / 4
	}) }),
	"rectangle": new Style({ image: new RegularShape({
		fill,
		stroke,
		radius: 10 / Math.SQRT2,
		radius2: 10,
		points: 4,
		angle: 0,
		scale: [1, .5]
	}) }),
	"triangle": new Style({ image: new RegularShape({
		fill,
		stroke,
		points: 3,
		radius: 10,
		rotation: Math.PI / 4,
		angle: 0
	}) }),
	"star": new Style({ image: new RegularShape({
		fill,
		stroke,
		points: 5,
		radius: 10,
		radius2: 4,
		angle: 0
	}) }),
	"cross": new Style({ image: new RegularShape({
		fill,
		stroke,
		points: 4,
		radius: 10,
		radius2: 0,
		angle: 0
	}) }),
	"x": new Style({ image: new RegularShape({
		fill,
		stroke,
		points: 4,
		radius: 10,
		radius2: 0,
		angle: Math.PI / 4
	}) }),
	"stacked": [new Style({ image: new RegularShape({
		fill,
		stroke,
		points: 4,
		radius: 5,
		angle: Math.PI / 4,
		displacement: [0, 10]
	}) }), new Style({ image: new RegularShape({
		fill,
		stroke,
		points: 4,
		radius: 10,
		angle: Math.PI / 4
	}) })]
};
var styleKeys = [
	"x",
	"cross",
	"star",
	"triangle",
	"square",
	"rectangle",
	"stacked"
];
var count = 250;
var features = new Array(count);
var e = 45e5;
for (let i = 0; i < count; ++i) {
	features[i] = new Feature(new Point([2 * e * Math.random() - e, 2 * e * Math.random() - e]));
	features[i].setStyle(styles[styleKeys[Math.floor(Math.random() * styleKeys.length)]]);
}
var vectorLayer = new VectorLayer({ source: new VectorSource({ features }) });
new Map({
	layers: [vectorLayer],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var colors = [
	"blue",
	"green",
	"yellow",
	"aqua",
	"red"
];
var currentColor = 0;
document.getElementById("color-changer").addEventListener("click", function() {
	styles.square.getImage().setFill(new Fill({ color: colors[currentColor % colors.length] }));
	vectorLayer.changed();
	currentColor++;
});
//#endregion

//# sourceMappingURL=regularshape.js.map