import { Bt as register, Cr as fromLonLat, It as proj4, Mn as Map, Ot as ImageWMS, U as ScaleLine, jr as Projection, or as View, rr as defaults, un as ImageLayer } from "./common.js";
//#region examples/wms-image-custom-proj.js
proj4.defs("EPSG:21781", "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=660.077,13.551,369.344,2.484,1.783,2.939,5.66 +units=m +no_defs");
register(proj4);
var projection = new Projection({
	code: "EPSG:21781",
	extent: [
		485869.5728,
		76443.1884,
		837076.5648,
		299941.7864
	]
});
var extent = [
	42e4,
	3e4,
	9e5,
	35e4
];
var layers = [new ImageLayer({
	extent,
	source: new ImageWMS({
		url: "https://wms.geo.admin.ch/",
		crossOrigin: "anonymous",
		attributions: "© <a href=\"https://shop.swisstopo.admin.ch/en/products/maps/national/lk1000\"target=\"_blank\">Pixelmap 1:1000000 / geo.admin.ch</a>",
		params: {
			"LAYERS": "ch.swisstopo.pixelkarte-farbe-pk1000.noscale",
			"FORMAT": "image/jpeg"
		},
		serverType: "mapserver"
	})
}), new ImageLayer({
	extent,
	source: new ImageWMS({
		url: "https://wms.geo.admin.ch/",
		crossOrigin: "anonymous",
		attributions: "© <a href=\"https://www.hydrodaten.admin.ch/en/notes-on-the-flood-alert-maps.html\"target=\"_blank\">Flood Alert / geo.admin.ch</a>",
		params: { "LAYERS": "ch.bafu.hydroweb-warnkarte_national" },
		serverType: "mapserver"
	})
})];
new Map({
	controls: defaults().extend([new ScaleLine()]),
	layers,
	target: "map",
	view: new View({
		projection,
		center: fromLonLat([8.23, 46.86], projection),
		extent,
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=wms-image-custom-proj.js.map