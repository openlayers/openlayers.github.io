import { Fn as Stroke, Mn as Map, Pn as Style, Yr as getWidth, bn as VectorLayer, ct as getVectorContext, dn as VectorSource, gn as LineString, jn as TileLayer, or as View, xn as Feature, yn as StadiaMaps } from "./common.js";
//#region examples/flight-animation.js
var tileLayer = new TileLayer({ source: new StadiaMaps({ layer: "stamen_toner" }) });
var map = new Map({
	layers: [tileLayer],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 2
	})
});
var style = new Style({ stroke: new Stroke({
	color: "#EAE911",
	width: 2
}) });
var flightsSource = new VectorSource({
	attributions: "Flight data by <a href=\"https://openflights.org/data.html\">OpenFlights</a>,",
	loader: function() {
		fetch("data/openflights/flights.json").then(function(response) {
			return response.json();
		}).then(function(json) {
			const flightsData = json.flights;
			for (let i = 0; i < flightsData.length; i++) {
				const flight = flightsData[i];
				const from = flight[0];
				const to = flight[1];
				const arcLine = new arc.GreatCircle({
					x: from[1],
					y: from[0]
				}, {
					x: to[1],
					y: to[0]
				}).Arc(100, { offset: 10 });
				const features = [];
				arcLine.geometries.forEach(function(geometry) {
					const line = new LineString(geometry.coords);
					line.transform("EPSG:4326", "EPSG:3857");
					features.push(new Feature({
						geometry: line,
						finished: false
					}));
				});
				addLater(features, i * 50);
			}
			tileLayer.on("postrender", animateFlights);
		});
	}
});
var flightsLayer = new VectorLayer({
	source: flightsSource,
	style: function(feature) {
		if (feature.get("finished")) return style;
		return null;
	}
});
map.addLayer(flightsLayer);
var pointsPerMs = .02;
function animateFlights(event) {
	const vectorContext = getVectorContext(event);
	const frameState = event.frameState;
	vectorContext.setStyle(style);
	const features = flightsSource.getFeatures();
	for (let i = 0; i < features.length; i++) {
		const feature = features[i];
		if (!feature.get("finished")) {
			const coords = feature.getGeometry().getCoordinates();
			const elapsedTime = frameState.time - feature.get("start");
			if (elapsedTime >= 0) {
				const elapsedPoints = elapsedTime * pointsPerMs;
				if (elapsedPoints >= coords.length) feature.set("finished", true);
				const maxIndex = Math.min(elapsedPoints, coords.length);
				const currentLine = new LineString(coords.slice(0, maxIndex));
				const worldWidth = getWidth(map.getView().getProjection().getExtent());
				const offset = Math.floor(map.getView().getCenter()[0] / worldWidth);
				currentLine.translate(offset * worldWidth, 0);
				vectorContext.drawGeometry(currentLine);
				currentLine.translate(worldWidth, 0);
				vectorContext.drawGeometry(currentLine);
			}
		}
	}
	map.render();
}
function addLater(features, timeout) {
	window.setTimeout(function() {
		let start = Date.now();
		features.forEach(function(feature) {
			feature.set("start", start);
			flightsSource.addFeature(feature);
			const duration = (feature.getGeometry().getCoordinates().length - 1) / pointsPerMs;
			start += duration;
		});
	}, timeout);
}
//#endregion

//# sourceMappingURL=flight-animation.js.map