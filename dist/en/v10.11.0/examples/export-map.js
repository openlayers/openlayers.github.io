import { $ as zip, H as Heatmap, Ln as Fill, Mn as Map, Pn as Style, Vn as asArray, Vt as writeArrayBuffer, bn as VectorLayer, dn as VectorSource, or as View, rn as GeoJSON } from "./common.js";
//#region examples/export-map.js
var style = new Style({ fill: new Fill({ color: "#eeeeee" }) });
var map = new Map({
	layers: [new VectorLayer({
		source: new VectorSource({
			url: "https://openlayers.org/data/vector/ecoregions.json",
			format: new GeoJSON()
		}),
		background: "white",
		style: function(feature) {
			const color = asArray(feature.get("COLOR_NNH") || "#eeeeee");
			color[3] = .75;
			style.getFill().setColor(color);
			return style;
		}
	}), new Heatmap({
		source: new VectorSource({
			url: "data/geojson/world-cities.geojson",
			format: new GeoJSON()
		}),
		weight: function(feature) {
			return feature.get("population") / 1e7;
		},
		radius: 15,
		blur: 15,
		opacity: .75
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
document.getElementById("export-map").addEventListener("click", () => {
	const format = document.getElementById("export-format").value;
	const mapCanvas = document.createElement("canvas");
	const size = map.getSize();
	mapCanvas.width = size[0];
	mapCanvas.height = size[1];
	map.setTarget(mapCanvas);
	map.once("rendercomplete", () => {
		const view = map.getView();
		const extent = view.calculateExtent(size);
		const resolution = view.getResolution();
		const projection = view.getProjection();
		if (format === "geotiff") exportGeoTIFF(mapCanvas, size, extent, resolution, projection);
		else if (format === "png") exportPNG(mapCanvas);
		else if (format === "png-world") exportPNGWithWorldfile(mapCanvas, extent, resolution);
		map.setTarget("map");
	});
});
function exportGeoTIFF(canvas, size, extent, resolution, projection) {
	const imageData = canvas.getContext("2d").getImageData(0, 0, size[0], size[1]);
	const epsgCode = projection.getCode().split(":")[1];
	const tiff = writeArrayBuffer(imageData.data, {
		width: size[0],
		height: size[1],
		ModelPixelScale: [
			resolution,
			resolution,
			0
		],
		ModelTiepoint: [
			0,
			0,
			0,
			extent[0],
			extent[3],
			0
		],
		GTRasterTypeGeoKey: 1,
		ProjectedCSTypeGeoKey: parseInt(epsgCode)
	});
	downloadFile(new Blob([tiff], { type: "image/tiff" }), "map-export.tiff");
}
function exportPNG(canvas) {
	const link = document.createElement("a");
	link.href = canvas.toDataURL("image/png");
	link.download = "map-export.png";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
function exportPNGWithWorldfile(canvas, extent, resolution) {
	const worldfileContent = [
		resolution.toFixed(6),
		"0.000000",
		"0.000000",
		(-resolution).toFixed(6),
		extent[0].toFixed(6),
		extent[3].toFixed(6)
	].join("\n");
	canvas.toBlob((pngBlob) => {
		pngBlob.arrayBuffer().then((pngBuffer) => {
			zip({
				"map-export.png": [new Uint8Array(pngBuffer), { level: 0 }],
				"map-export.pgw": [new TextEncoder().encode(worldfileContent), { level: 6 }]
			}, (err, data) => {
				if (err) {
					alert("Error creating zip:", err);
					return;
				}
				downloadFile(new Blob([data], { type: "application/zip" }), "map-export.zip");
			});
		});
	});
}
function downloadFile(blob, filename) {
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
//#endregion

//# sourceMappingURL=export-map.js.map