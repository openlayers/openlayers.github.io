import { Cr as fromLonLat, Dt as OGCMapTile, In as Icon, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, hr as Point, jn as TileLayer, or as View, xn as Feature } from "./common.js";
//#region examples/icon-color.js
var rome = new Feature({ geometry: new Point(fromLonLat([12.5, 41.9])) });
var london = new Feature({ geometry: new Point(fromLonLat([-.12755, 51.507222])) });
var madrid = new Feature({ geometry: new Point(fromLonLat([-3.683333, 40.4])) });
var paris = new Feature({ geometry: new Point(fromLonLat([2.353, 48.8566])) });
var berlin = new Feature({ geometry: new Point(fromLonLat([13.3884, 52.5169])) });
rome.setStyle(new Style({ image: new Icon({
	color: "#BADA55",
	crossOrigin: "anonymous",
	src: "data/square.svg"
}) }));
london.setStyle(new Style({ image: new Icon({
	color: "rgba(255, 0, 0, .5)",
	crossOrigin: "anonymous",
	src: "data/bigdot.png",
	scale: .2
}) }));
madrid.setStyle(new Style({ image: new Icon({
	crossOrigin: "anonymous",
	src: "data/bigdot.png",
	scale: .2
}) }));
paris.setStyle(new Style({ image: new Icon({
	color: "#8959A8",
	crossOrigin: "anonymous",
	src: "data/dot.svg"
}) }));
berlin.setStyle(new Style({ image: new Icon({
	crossOrigin: "anonymous",
	src: "data/dot.svg"
}) }));
var vectorLayer = new VectorLayer({ source: new VectorSource({ features: [
	rome,
	london,
	madrid,
	paris,
	berlin
] }) });
new Map({
	layers: [new TileLayer({ source: new OGCMapTile({
		url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad",
		crossOrigin: ""
	}) }), vectorLayer],
	target: document.getElementById("map"),
	view: new View({
		center: fromLonLat([2.896372, 44.6024]),
		zoom: 3
	})
});
//#endregion

//# sourceMappingURL=icon-color.js.map