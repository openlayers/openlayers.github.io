import { Cn as OSM, Cr as fromLonLat, Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, bn as VectorLayer, dn as VectorSource, hr as Point, jn as TileLayer, or as View, xn as Feature, zn as RegularShape } from "./common.js";
//#region examples/wind-arrows.js
var shaft = new RegularShape({
	points: 2,
	radius: 5,
	stroke: new Stroke({
		width: 2,
		color: "black"
	}),
	rotateWithView: true
});
var head = new RegularShape({
	points: 3,
	radius: 5,
	fill: new Fill({ color: "black" }),
	rotateWithView: true
});
var styles = [new Style({ image: shaft }), new Style({ image: head })];
var source = new VectorSource({ attributions: "Weather data by <a href=\"https://openweathermap.org/current\">OpenWeather</a>" });
var map = new Map({
	layers: [new TileLayer({ source: new OSM() }), new VectorLayer({
		source,
		style: function(feature) {
			const wind = feature.get("wind");
			const angle = (wind.deg - 180) * Math.PI / 180;
			const scale = wind.speed / 10;
			shaft.setScale([1, scale]);
			shaft.setRotation(angle);
			head.setDisplacement([0, head.getRadius() / 2 + shaft.getRadius() * scale]);
			head.setRotation(angle);
			return styles;
		}
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
fetch("data/openweather/weather.json").then(function(response) {
	return response.json();
}).then(function(data) {
	const features = [];
	data.list.forEach(function(report) {
		const feature = new Feature(new Point(fromLonLat([report.coord.lon, report.coord.lat])));
		feature.setProperties(report);
		features.push(feature);
	});
	source.addFeatures(features);
	map.getView().fit(source.getExtent());
});
//#endregion

//# sourceMappingURL=wind-arrows.js.map