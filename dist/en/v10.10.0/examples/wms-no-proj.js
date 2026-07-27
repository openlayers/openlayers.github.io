import { Ct as TileWMS, Mn as Map, Ot as ImageWMS, U as ScaleLine, jn as TileLayer, jr as Projection, or as View, rr as defaults, un as ImageLayer } from "./common.js";
//#region examples/wms-no-proj.js
var layers = [new TileLayer({ source: new TileWMS({
	attributions: "© <a href=\"https://shop.swisstopo.admin.ch/en/products/maps/national/lk1000\"target=\"_blank\">Pixelmap 1:1000000 / geo.admin.ch</a>",
	crossOrigin: "anonymous",
	params: {
		"LAYERS": "ch.swisstopo.pixelkarte-farbe-pk1000.noscale",
		"FORMAT": "image/jpeg"
	},
	url: "https://wms.geo.admin.ch/"
}) }), new ImageLayer({ source: new ImageWMS({
	attributions: "© <a href=\"https://www.hydrodaten.admin.ch/en/notes-on-the-flood-alert-maps.html\"target=\"_blank\">Flood Alert / geo.admin.ch</a>",
	crossOrigin: "anonymous",
	params: { "LAYERS": "ch.bafu.hydroweb-warnkarte_national" },
	serverType: "mapserver",
	url: "https://wms.geo.admin.ch/"
}) })];
var projection = new Projection({
	code: "EPSG:21781",
	units: "m"
});
new Map({
	controls: defaults().extend([new ScaleLine()]),
	layers,
	target: "map",
	view: new View({
		center: [66e4, 19e4],
		projection,
		zoom: 9
	})
});
//#endregion

//# sourceMappingURL=wms-no-proj.js.map