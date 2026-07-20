import { Hn as Layer, Mn as Map, bn as VectorLayer, dn as VectorSource, hr as Point, or as View, vr as composeCssTransform, xn as Feature } from "./common.js";
//#region examples/svg-layer.js
var map = new Map({
	target: "map",
	view: new View({
		center: [0, 0],
		extent: [
			-180,
			-90,
			180,
			90
		],
		projection: "EPSG:4326",
		zoom: 2
	})
});
var svgContainer = document.createElement("div");
var xhr = new XMLHttpRequest();
xhr.open("GET", "data/world.svg");
xhr.addEventListener("load", function() {
	const svg = xhr.responseXML.documentElement;
	svgContainer.ownerDocument.importNode(svg);
	svgContainer.appendChild(svg);
});
xhr.send();
var width = 2560;
var height = 1280;
var svgResolution = 360 / width;
svgContainer.style.width = "2560px";
svgContainer.style.height = "1280px";
svgContainer.style.transformOrigin = "top left";
svgContainer.className = "svg-layer";
svgContainer.style.position = "absolute";
map.addLayer(new Layer({ render: function(frameState) {
	const scale = svgResolution / frameState.viewState.resolution;
	const center = frameState.viewState.center;
	const size = frameState.size;
	const cssTransform = composeCssTransform(size[0] / 2, size[1] / 2, scale, scale, frameState.viewState.rotation, -center[0] / svgResolution - width / 2, center[1] / svgResolution - height / 2);
	svgContainer.style.transform = cssTransform;
	svgContainer.style.opacity = String(this.getOpacity());
	return svgContainer;
} }));
map.addLayer(new VectorLayer({
	source: new VectorSource({ features: [new Feature(new Point([0, 0]))] }),
	style: {
		"circle-fill-color": "blue",
		"circle-radius": 10,
		"circle-stroke-color": "white"
	}
}));
//#endregion

//# sourceMappingURL=svg-layer.js.map