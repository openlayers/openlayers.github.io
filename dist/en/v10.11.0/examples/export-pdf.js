import { B as WKT, Cn as OSM, Mn as Map, V as E, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/export-pdf.js
var raster = new TileLayer({ source: new OSM() });
var feature = new WKT().readFeature("POLYGON((10.689697265625 -25.0927734375, 34.595947265625 -20.1708984375, 38.814697265625 -35.6396484375, 13.502197265625 -39.1552734375, 10.689697265625 -25.0927734375))");
feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
var map = new Map({
	layers: [raster, new VectorLayer({
		source: new VectorSource({ features: [feature] }),
		opacity: .5
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var dims = {
	a0: [1189, 841],
	a1: [841, 594],
	a2: [594, 420],
	a3: [420, 297],
	a4: [297, 210],
	a5: [210, 148]
};
var exportButton = document.getElementById("export-pdf");
exportButton.addEventListener("click", function() {
	exportButton.disabled = true;
	document.body.style.cursor = "progress";
	const format = document.getElementById("format").value;
	const resolution = Number(document.getElementById("resolution").value);
	const dim = dims[format];
	const width = Math.round(dim[0] * resolution / 25.4);
	const height = Math.round(dim[1] * resolution / 25.4);
	const size = map.getSize();
	const viewResolution = map.getView().getResolution();
	map.once("rendercomplete", function() {
		const mapCanvas = document.createElement("canvas");
		mapCanvas.width = width;
		mapCanvas.height = height;
		const mapContext = mapCanvas.getContext("2d");
		Array.prototype.forEach.call(document.querySelectorAll(".ol-layer canvas"), function(canvas) {
			if (canvas.width > 0) {
				const opacity = canvas.parentNode.style.opacity;
				mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
				const matrix = canvas.style.transform.match(/^matrix\(([^\(]*)\)$/)[1].split(",").map(Number);
				CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
				mapContext.drawImage(canvas, 0, 0);
			}
		});
		mapContext.globalAlpha = 1;
		mapContext.setTransform(1, 0, 0, 1, 0, 0);
		const pdf = new E("landscape", void 0, format);
		pdf.addImage(mapCanvas.toDataURL("image/jpeg"), "JPEG", 0, 0, dim[0], dim[1]);
		pdf.save("map.pdf");
		map.setSize(size);
		map.getView().setResolution(viewResolution);
		exportButton.disabled = false;
		document.body.style.cursor = "auto";
	});
	const printSize = [width, height];
	map.setSize(printSize);
	const scaling = Math.min(width / size[0], height / size[1]);
	map.getView().setResolution(viewResolution / scaling);
}, false);
//#endregion

//# sourceMappingURL=export-pdf.js.map