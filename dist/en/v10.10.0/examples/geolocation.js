import { Cn as OSM, Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, bn as VectorLayer, dn as VectorSource, hr as Point, jn as TileLayer, or as View, ut as Geolocation, xn as Feature } from "./common.js";
//#region examples/geolocation.js
var view = new View({
	center: [0, 0],
	zoom: 2
});
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view
});
var geolocation = new Geolocation({
	trackingOptions: { enableHighAccuracy: true },
	projection: view.getProjection()
});
function el(id) {
	return document.getElementById(id);
}
el("track").addEventListener("change", function() {
	geolocation.setTracking(this.checked);
});
geolocation.on("change", function() {
	el("accuracy").innerText = geolocation.getAccuracy() + " [m]";
	el("altitude").innerText = geolocation.getAltitude() + " [m]";
	el("altitudeAccuracy").innerText = geolocation.getAltitudeAccuracy() + " [m]";
	el("heading").innerText = geolocation.getHeading() + " [rad]";
	el("speed").innerText = geolocation.getSpeed() + " [m/s]";
});
geolocation.on("error", function(error) {
	const info = document.getElementById("info");
	info.innerHTML = error.message;
	info.style.display = "";
});
var accuracyFeature = new Feature();
geolocation.on("change:accuracyGeometry", function() {
	accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});
var positionFeature = new Feature();
positionFeature.setStyle(new Style({ image: new CircleStyle({
	radius: 6,
	fill: new Fill({ color: "#3399CC" }),
	stroke: new Stroke({
		color: "#fff",
		width: 2
	})
}) }));
geolocation.on("change:position", function() {
	const coordinates = geolocation.getPosition();
	positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
});
new VectorLayer({
	map,
	source: new VectorSource({ features: [accuracyFeature, positionFeature] })
});
//#endregion

//# sourceMappingURL=geolocation.js.map