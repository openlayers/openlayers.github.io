import { Fn as Stroke, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, bn as VectorLayer, dn as VectorSource, mn as MultiPoint, or as View, rn as GeoJSON } from "./common.js";
//#region examples/polygon-styles.js
var styles = [new Style({
	stroke: new Stroke({
		color: "blue",
		width: 3
	}),
	fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" })
}), new Style({
	image: new CircleStyle({
		radius: 5,
		fill: new Fill({ color: "orange" })
	}),
	geometry: function(feature) {
		const coordinates = feature.getGeometry().getCoordinates()[0];
		return new MultiPoint(coordinates);
	}
})];
new Map({
	layers: [new VectorLayer({
		source: new VectorSource({ features: new GeoJSON().readFeatures({
			"type": "FeatureCollection",
			"features": [
				{
					"type": "Feature",
					"geometry": {
						"type": "Polygon",
						"coordinates": [[
							[-5e6, 6e6],
							[-5e6, 8e6],
							[-3e6, 8e6],
							[-3e6, 6e6],
							[-5e6, 6e6]
						]]
					}
				},
				{
					"type": "Feature",
					"geometry": {
						"type": "Polygon",
						"coordinates": [[
							[-2e6, 6e6],
							[-2e6, 8e6],
							[0, 8e6],
							[0, 6e6],
							[-2e6, 6e6]
						]]
					}
				},
				{
					"type": "Feature",
					"geometry": {
						"type": "Polygon",
						"coordinates": [[
							[1e6, 6e6],
							[1e6, 8e6],
							[3e6, 8e6],
							[3e6, 6e6],
							[1e6, 6e6]
						]]
					}
				},
				{
					"type": "Feature",
					"geometry": {
						"type": "Polygon",
						"coordinates": [[
							[-2e6, -1e6],
							[-1e6, 1e6],
							[0, -1e6],
							[-2e6, -1e6]
						]]
					}
				}
			]
		}) }),
		style: styles
	})],
	target: "map",
	view: new View({
		center: [0, 3e6],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=polygon-styles.js.map