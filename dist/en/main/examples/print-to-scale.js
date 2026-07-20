import { r as __toESM } from "./rolldown-runtime.js";
import { Bt as register, It as proj4, Mn as Map, Tr as getPointResolution, U as ScaleLine, V as E, b as WMTSCapabilities, bt as WMTS, jn as TileLayer, or as View, rr as defaults, wr as get, x as require_html2canvas, xt as optionsFromCapabilities } from "./common.js";
//#region examples/print-to-scale.js
var import_html2canvas = /* @__PURE__ */ __toESM(require_html2canvas(), 1);
proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
register(proj4);
var proj27700 = get("EPSG:27700");
proj27700.setExtent([
	0,
	0,
	7e5,
	13e5
]);
var raster = new TileLayer();
fetch("https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS").then(function(response) {
	return response.text();
}).then(function(text) {
	const options = optionsFromCapabilities(new WMTSCapabilities().read(text), { layer: "OS_Open_Raster" });
	options.attributions = "Contains OS data © Crown Copyright and database right " + (/* @__PURE__ */ new Date()).getFullYear();
	options.crossOrigin = "";
	options.projection = proj27700;
	options.wrapX = false;
	raster.setSource(new WMTS(options));
});
var map = new Map({
	layers: [raster],
	controls: defaults({ attributionOptions: { collapsible: false } }),
	target: "map",
	view: new View({
		center: [373500, 436500],
		projection: proj27700,
		zoom: 7
	})
});
var scaleLine = new ScaleLine({
	bar: true,
	text: true,
	minWidth: 125
});
map.addControl(scaleLine);
var dims = {
	a0: [1189, 841],
	a1: [841, 594],
	a2: [594, 420],
	a3: [420, 297],
	a4: [297, 210],
	a5: [210, 148]
};
var exportOptions = {
	useCORS: true,
	ignoreElements: function(element) {
		const className = element.className || "";
		return className.includes("ol-control") && !className.includes("ol-scale") && (!className.includes("ol-attribution") || !className.includes("ol-uncollapsible"));
	}
};
var exportButton = document.getElementById("export-pdf");
exportButton.addEventListener("click", function() {
	exportButton.disabled = true;
	document.body.style.cursor = "progress";
	const format = document.getElementById("format").value;
	const resolution = document.getElementById("resolution").value;
	const scale = document.getElementById("scale").value;
	const dim = dims[format];
	const width = Math.round(dim[0] * resolution / 25.4);
	const height = Math.round(dim[1] * resolution / 25.4);
	const viewResolution = map.getView().getResolution();
	const scaleResolution = scale / getPointResolution(map.getView().getProjection(), resolution / 25.4, map.getView().getCenter());
	map.once("rendercomplete", function() {
		exportOptions.width = width;
		exportOptions.height = height;
		(0, import_html2canvas.default)(map.getViewport(), exportOptions).then(function(canvas) {
			const pdf = new E("landscape", void 0, format);
			pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, dim[0], dim[1]);
			pdf.save("map.pdf");
			scaleLine.setDpi(void 0);
			map.getTargetElement().style.width = "";
			map.getTargetElement().style.height = "";
			map.updateSize();
			map.getView().setResolution(viewResolution);
			exportButton.disabled = false;
			document.body.style.cursor = "auto";
		});
	});
	scaleLine.setDpi(resolution);
	map.getTargetElement().style.width = width + "px";
	map.getTargetElement().style.height = height + "px";
	map.updateSize();
	map.getView().setResolution(scaleResolution);
}, false);
//#endregion

//# sourceMappingURL=print-to-scale.js.map