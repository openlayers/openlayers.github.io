import { Mn as Map, bn as VectorLayer, dn as VectorSource, hr as Point, or as View, xn as Feature } from "./common.js";
//#region examples/layer-z-index.js
var styles = {
	square: {
		"shape-points": 4,
		"shape-radius": 80,
		"shape-angle": Math.PI / 4,
		"shape-stroke-color": "black",
		"shape-stroke-width": 1,
		"shape-fill-color": "blue"
	},
	triangle: {
		"shape-points": 3,
		"shape-radius": 80,
		"shape-rotation": Math.PI / 4,
		"shape-stroke-color": "black",
		"shape-stroke-width": 1,
		"shape-fill-color": "red"
	},
	star: {
		"shape-points": 5,
		"shape-radius": 80,
		"shape-radius2": 40,
		"shape-rotation": Math.PI / 4,
		"shape-stroke-color": "black",
		"shape-stroke-width": 1,
		"shape-fill-color": "green"
	}
};
function createLayer(coordinates, style, zIndex) {
	const vectorLayer = new VectorLayer({
		source: new VectorSource({ features: [new Feature(new Point(coordinates))] }),
		style
	});
	vectorLayer.setZIndex(zIndex);
	return vectorLayer;
}
var layer0 = createLayer([40, 40], styles.star);
var layer1 = createLayer([0, 0], styles.square, 1);
var layer2 = createLayer([0, 40], styles.triangle, 0);
var layers = [];
layers.push(layer1);
layers.push(layer2);
var map = new Map({
	layers,
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 18
	})
});
layer0.setMap(map);
function bindInputs(id, layer) {
	const idxInput = document.getElementById("idx" + id);
	idxInput.onchange = function() {
		layer.setZIndex(parseInt(this.value, 10) || 0);
	};
	idxInput.value = String(layer.getZIndex());
}
bindInputs(1, layer1);
bindInputs(2, layer2);
//#endregion

//# sourceMappingURL=layer-z-index.js.map