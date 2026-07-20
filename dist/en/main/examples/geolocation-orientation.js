import { Cn as OSM, Cr as fromLonLat, Mn as Map, at as Overlay, gn as LineString, jn as TileLayer, or as View, ut as Geolocation } from "./common.js";
//#region examples/geolocation-orientation.js
var view = new View({
	center: fromLonLat([5.8713, 45.6452]),
	zoom: 19
});
var tileLayer = new TileLayer({ source: new OSM() });
var map = new Map({
	layers: [tileLayer],
	target: "map",
	view
});
var markerEl = document.getElementById("geolocation_marker");
var marker = new Overlay({
	positioning: "center-center",
	element: markerEl,
	stopEvent: false
});
map.addOverlay(marker);
var positions = new LineString([], "XYZM");
var geolocation = new Geolocation({
	projection: view.getProjection(),
	trackingOptions: {
		maximumAge: 1e4,
		enableHighAccuracy: true,
		timeout: 6e5
	}
});
var deltaMean = 500;
geolocation.on("change", function() {
	const position = geolocation.getPosition();
	const accuracy = geolocation.getAccuracy();
	const heading = geolocation.getHeading() || 0;
	const speed = geolocation.getSpeed() || 0;
	addPosition(position, heading, Date.now(), speed);
	const coords = positions.getCoordinates();
	const len = coords.length;
	if (len >= 2) deltaMean = (coords[len - 1][3] - coords[0][3]) / (len - 1);
	const html = [
		"Position: " + position[0].toFixed(2) + ", " + position[1].toFixed(2),
		"Accuracy: " + accuracy,
		"Heading: " + Math.round(radToDeg(heading)) + "&deg;",
		"Speed: " + (speed * 3.6).toFixed(1) + " km/h",
		"Delta: " + Math.round(deltaMean) + "ms"
	].join("<br />");
	document.getElementById("info").innerHTML = html;
});
geolocation.on("error", function() {
	alert("geolocation error");
});
function radToDeg(rad) {
	return rad * 360 / (Math.PI * 2);
}
function degToRad(deg) {
	return deg * Math.PI * 2 / 360;
}
function mod(n) {
	return (n % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
}
function addPosition(position, heading, m, speed) {
	const x = position[0];
	const y = position[1];
	const fCoords = positions.getCoordinates();
	const previous = fCoords[fCoords.length - 1];
	const prevHeading = previous && previous[2];
	if (prevHeading) {
		let headingDiff = heading - mod(prevHeading);
		if (Math.abs(headingDiff) > Math.PI) headingDiff = -(headingDiff >= 0 ? 1 : -1) * (2 * Math.PI - Math.abs(headingDiff));
		heading = prevHeading + headingDiff;
	}
	positions.appendCoordinate([
		x,
		y,
		heading,
		m
	]);
	positions.setCoordinates(positions.getCoordinates().slice(-20));
	if (heading && speed) markerEl.src = "data/geolocation_marker_heading.png";
	else markerEl.src = "data/geolocation_marker.png";
}
function getCenterWithHeading(position, rotation, resolution) {
	const height = map.getSize()[1];
	return [position[0] - Math.sin(rotation) * height * resolution * 1 / 4, position[1] + Math.cos(rotation) * height * resolution * 1 / 4];
}
var previousM = 0;
function updateView() {
	let m = Date.now() - deltaMean * 1.5;
	m = Math.max(m, previousM);
	previousM = m;
	const c = positions.getCoordinateAtM(m, true);
	if (c) {
		view.setCenter(getCenterWithHeading(c, -c[2], view.getResolution()));
		view.setRotation(-c[2]);
		marker.setPosition(c);
		map.render();
	}
}
var geolocateBtn = document.getElementById("geolocate");
geolocateBtn.addEventListener("click", function() {
	geolocation.setTracking(true);
	tileLayer.on("postrender", updateView);
	map.render();
	disableButtons();
}, false);
var simulationData;
var client = new XMLHttpRequest();
client.open("GET", "data/geolocation-orientation.json");
/**
* Handle data loading.
*/
client.onload = function() {
	simulationData = JSON.parse(client.responseText).data;
};
client.send();
var simulateBtn = document.getElementById("simulate");
simulateBtn.addEventListener("click", function() {
	const coordinates = simulationData;
	const first = coordinates.shift();
	simulatePositionChange(first);
	let prevDate = first.timestamp;
	function geolocate() {
		const position = coordinates.shift();
		if (!position) return;
		const newDate = position.timestamp;
		simulatePositionChange(position);
		window.setTimeout(function() {
			prevDate = newDate;
			geolocate();
		}, (newDate - prevDate) / .5);
	}
	geolocate();
	tileLayer.on("postrender", updateView);
	map.render();
	disableButtons();
}, false);
function simulatePositionChange(position) {
	const coords = position.coords;
	geolocation.set("accuracy", coords.accuracy);
	geolocation.set("heading", degToRad(coords.heading));
	const projectedPosition = fromLonLat([coords.longitude, coords.latitude]);
	geolocation.set("position", projectedPosition);
	geolocation.set("speed", coords.speed);
	geolocation.changed();
}
function disableButtons() {
	geolocateBtn.disabled = true;
	simulateBtn.disabled = true;
}
//#endregion

//# sourceMappingURL=geolocation-orientation.js.map