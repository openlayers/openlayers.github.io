import { Cn as OSM, Fn as Stroke, Jt as Circle, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON, xn as Feature } from "./common.js";
//#region examples/geojson.js
var image = new CircleStyle({
	radius: 5,
	fill: null,
	stroke: new Stroke({
		color: "red",
		width: 1
	})
});
var styles = {
	"Point": new Style({ image }),
	"LineString": new Style({ stroke: new Stroke({
		color: "green",
		width: 1
	}) }),
	"MultiLineString": new Style({ stroke: new Stroke({
		color: "green",
		width: 1
	}) }),
	"MultiPoint": new Style({ image }),
	"MultiPolygon": new Style({
		stroke: new Stroke({
			color: "yellow",
			width: 1
		}),
		fill: new Fill({ color: "rgba(255, 255, 0, 0.1)" })
	}),
	"Polygon": new Style({
		stroke: new Stroke({
			color: "blue",
			lineDash: [4],
			width: 3
		}),
		fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" })
	}),
	"GeometryCollection": new Style({
		stroke: new Stroke({
			color: "magenta",
			width: 2
		}),
		fill: new Fill({ color: "magenta" }),
		image: new CircleStyle({
			radius: 10,
			fill: null,
			stroke: new Stroke({ color: "magenta" })
		})
	}),
	"Circle": new Style({
		stroke: new Stroke({
			color: "red",
			width: 2
		}),
		fill: new Fill({ color: "rgba(255,0,0,0.2)" })
	})
};
var styleFunction = function(feature) {
	return styles[feature.getGeometry().getType()];
};
var vectorSource = new VectorSource({ features: new GeoJSON().readFeatures({
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [0, 0]
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[4e6, -2e6], [8e6, 2e6]]
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[4e6, 2e6], [8e6, -2e6]]
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [[
					[-5e6, -1e6],
					[-3e6, -1e6],
					[-4e6, 1e6],
					[-5e6, -1e6]
				]]
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "MultiLineString",
				"coordinates": [
					[[-1e6, -75e4], [-1e6, 75e4]],
					[[1e6, -75e4], [1e6, 75e4]],
					[[-75e4, -1e6], [75e4, -1e6]],
					[[-75e4, 1e6], [75e4, 1e6]]
				]
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [
					[[
						[-5e6, 6e6],
						[-3e6, 6e6],
						[-3e6, 8e6],
						[-5e6, 8e6],
						[-5e6, 6e6]
					]],
					[[
						[-2e6, 6e6],
						[0, 6e6],
						[0, 8e6],
						[-2e6, 8e6],
						[-2e6, 6e6]
					]],
					[[
						[1e6, 6e6],
						[3e6, 6e6],
						[3e6, 8e6],
						[1e6, 8e6],
						[1e6, 6e6]
					]]
				]
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "GeometryCollection",
				"geometries": [
					{
						"type": "LineString",
						"coordinates": [[-5e6, -5e6], [0, -5e6]]
					},
					{
						"type": "Point",
						"coordinates": [4e6, -5e6]
					},
					{
						"type": "Polygon",
						"coordinates": [[
							[1e6, -6e6],
							[3e6, -6e6],
							[2e6, -4e6],
							[1e6, -6e6]
						]]
					}
				]
			}
		}
	]
}) });
vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));
var vectorLayer = new VectorLayer({
	source: vectorSource,
	style: styleFunction
});
new Map({
	layers: [new TileLayer({ source: new OSM() }), vectorLayer],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=geojson.js.map