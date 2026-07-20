import { Ct as TileWMS, Mn as Map, Or as transform, Sr as addProjection, U as ScaleLine, jn as TileLayer, jr as Projection, or as View, rr as defaults, xr as addCoordinateTransforms } from "./common.js";
//#region examples/wms-custom-proj.js
var projection = new Projection({
	code: "EPSG:21781",
	extent: [
		485869.5728,
		76443.1884,
		837076.5648,
		299941.7864
	],
	units: "m"
});
addProjection(projection);
addCoordinateTransforms("EPSG:4326", projection, function(coordinate) {
	return [WGStoCHy(coordinate[1], coordinate[0]), WGStoCHx(coordinate[1], coordinate[0])];
}, function(coordinate) {
	return [CHtoWGSlng(coordinate[0], coordinate[1]), CHtoWGSlat(coordinate[0], coordinate[1])];
});
var extent = [
	42e4,
	3e4,
	9e5,
	35e4
];
var layers = [new TileLayer({
	extent,
	source: new TileWMS({
		url: "https://wms.geo.admin.ch/",
		crossOrigin: "anonymous",
		attributions: "© <a href=\"https://shop.swisstopo.admin.ch/en/products/maps/national/lk1000\"target=\"_blank\">Pixelmap 1:1000000 / geo.admin.ch</a>",
		params: {
			"LAYERS": "ch.swisstopo.pixelkarte-farbe-pk1000.noscale",
			"FORMAT": "image/jpeg"
		},
		serverType: "mapserver"
	})
}), new TileLayer({
	extent,
	source: new TileWMS({
		url: "https://wms.geo.admin.ch/",
		crossOrigin: "anonymous",
		attributions: "© <a href=\"https://www.hydrodaten.admin.ch/en/notes-on-the-flood-alert-maps.html\"target=\"_blank\">Flood Alert / geo.admin.ch</a>",
		params: { "LAYERS": "ch.bafu.hydroweb-warnkarte_national" },
		serverType: "mapserver"
	})
})];
new Map({
	controls: defaults().extend([new ScaleLine({ units: "metric" })]),
	layers,
	target: "map",
	view: new View({
		projection,
		center: transform([8.23, 46.86], "EPSG:4326", "EPSG:21781"),
		extent,
		zoom: 2
	})
});
function WGStoCHy(lat, lng) {
	lat = DECtoSEX(lat);
	lng = DECtoSEX(lng);
	lat = DEGtoSEC(lat);
	lng = DEGtoSEC(lng);
	const lat_aux = (lat - 169028.66) / 1e4;
	const lng_aux = (lng - 26782.5) / 1e4;
	return 600072.37 + 211455.93 * lng_aux - 10938.51 * lng_aux * lat_aux - .36 * lng_aux * Math.pow(lat_aux, 2) - 44.54 * Math.pow(lng_aux, 3);
}
function WGStoCHx(lat, lng) {
	lat = DECtoSEX(lat);
	lng = DECtoSEX(lng);
	lat = DEGtoSEC(lat);
	lng = DEGtoSEC(lng);
	const lat_aux = (lat - 169028.66) / 1e4;
	const lng_aux = (lng - 26782.5) / 1e4;
	return 200147.07 + 308807.95 * lat_aux + 3745.25 * Math.pow(lng_aux, 2) + 76.63 * Math.pow(lat_aux, 2) - 194.56 * Math.pow(lng_aux, 2) * lat_aux + 119.79 * Math.pow(lat_aux, 3);
}
function CHtoWGSlat(y, x) {
	const y_aux = (y - 6e5) / 1e6;
	const x_aux = (x - 2e5) / 1e6;
	let lat = 16.9023892 + 3.238272 * x_aux - .270978 * Math.pow(y_aux, 2) - .002528 * Math.pow(x_aux, 2) - .0447 * Math.pow(y_aux, 2) * x_aux - .014 * Math.pow(x_aux, 3);
	lat = lat * 100 / 36;
	return lat;
}
function CHtoWGSlng(y, x) {
	const y_aux = (y - 6e5) / 1e6;
	const x_aux = (x - 2e5) / 1e6;
	let lng = 2.6779094 + 4.728982 * y_aux + .791484 * y_aux * x_aux + .1306 * y_aux * Math.pow(x_aux, 2) - .0436 * Math.pow(y_aux, 3);
	lng = lng * 100 / 36;
	return lng;
}
function DECtoSEX(angle) {
	const deg = parseInt(angle, 10);
	const min = parseInt((angle - deg) * 60, 10);
	const sec = ((angle - deg) * 60 - min) * 60;
	return deg + min / 100 + sec / 1e4;
}
function DEGtoSEC(angle) {
	const deg = parseInt(angle, 10);
	let min = parseInt((angle - deg) * 100, 10);
	let sec = ((angle - deg) * 100 - min) * 100;
	const parts = String(angle).split(".");
	if (parts.length == 2 && parts[1].length == 2) {
		min = Number(parts[1]);
		sec = 0;
	}
	return sec + min * 60 + deg * 3600;
}
//#endregion

//# sourceMappingURL=wms-custom-proj.js.map