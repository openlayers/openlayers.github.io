import { Cn as OSM, Mn as Map, Yr as getWidth, bt as WMTS, jn as TileLayer, kn as WMTSTileGrid, or as View, qr as getTopLeft, wr as get } from "./common.js";
//#region examples/wmts-dimensions.js
var projection = get("EPSG:3857");
var tileSizeMtrs = getWidth(projection.getExtent()) / 256;
var matrixIds = [];
var resolutions = [];
for (let i = 0; i <= 14; i++) {
	matrixIds[i] = String(i);
	resolutions[i] = tileSizeMtrs / Math.pow(2, i);
}
var wmtsSource = new WMTS({
	url: "https://ts2.scalgo.com/olpatch/wmts?token=CC5BF28A7D96B320C7DFBFD1236B5BEB",
	layer: "SRTM_4_1:SRTM_4_1_flooded_sealevels",
	format: "image/png",
	matrixSet: "EPSG:3857",
	attributions: ["<a href=\"https://scalgo.com\" target=\"_blank\">SCALGO</a>", "<a href=\"https://cgiarcsi.community/data/srtm-90m-digital-elevation-database-v4-1\" target=\"_blank\">CGIAR-CSI SRTM</a>"],
	tileGrid: new WMTSTileGrid({
		origin: getTopLeft(projection.getExtent()),
		resolutions,
		matrixIds
	}),
	style: "default",
	dimensions: { "threshold": 100 }
});
new Map({
	target: "map",
	view: new View({
		projection,
		center: [-9871995, 3566245],
		zoom: 6
	}),
	layers: [new TileLayer({ source: new OSM() }), new TileLayer({
		opacity: .5,
		source: wmtsSource
	})]
});
var slider = document.getElementById("slider");
var updateSourceDimension = function() {
	wmtsSource.updateDimensions({ "threshold": slider.value });
	document.getElementById("theinfo").innerHTML = slider.value + " meters";
};
slider.addEventListener("input", updateSourceDimension);
updateSourceDimension();
//#endregion

//# sourceMappingURL=wmts-dimensions.js.map