import { Fn as Stroke, G as Modify, Ln as Fill, Mn as Map, Pn as Style, Rn as CircleStyle, Wn as defaults, bn as VectorLayer, dn as VectorSource, nn as Select, or as View, rn as GeoJSON } from "./common.js";
//#region examples/modify-test.js
var styleFunction = (function() {
	const styles = {};
	const image = new CircleStyle({
		radius: 5,
		fill: null,
		stroke: new Stroke({
			color: "orange",
			width: 2
		})
	});
	styles["Point"] = new Style({ image });
	styles["Polygon"] = new Style({
		stroke: new Stroke({
			color: "blue",
			width: 3
		}),
		fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" })
	});
	styles["MultiLineString"] = new Style({ stroke: new Stroke({
		color: "green",
		width: 3
	}) });
	styles["MultiPolygon"] = new Style({
		stroke: new Stroke({
			color: "yellow",
			width: 1
		}),
		fill: new Fill({ color: "rgba(255, 255, 0, 0.1)" })
	});
	styles["default"] = new Style({
		stroke: new Stroke({
			color: "red",
			width: 3
		}),
		fill: new Fill({ color: "rgba(255, 0, 0, 0.1)" }),
		image
	});
	return function(feature) {
		return styles[feature.getGeometry().getType()] || styles["default"];
	};
})();
var layer = new VectorLayer({
	source: new VectorSource({ features: new GeoJSON().readFeatures({
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
					"type": "MultiPoint",
					"coordinates": [[-2e6, 0], [0, -2e6]]
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "LineString",
					"coordinates": [
						[4e6, -2e6],
						[8e6, 2e6],
						[9e6, 2e6]
					]
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "LineString",
					"coordinates": [
						[4e6, -2e6],
						[8e6, 2e6],
						[8e6, 3e6]
					]
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [[
						[-5e6, -1e6],
						[-4e6, 1e6],
						[-3e6, -1e6],
						[-5e6, -1e6]
					], [
						[-45e5, -5e5],
						[-35e5, -5e5],
						[-4e6, 5e5],
						[-45e5, -5e5]
					]]
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "MultiLineString",
					"coordinates": [
						[[-1e6, -75e4], [-1e6, 75e4]],
						[
							[-1e6, -75e4],
							[-1e6, 75e4],
							[-5e5, 0],
							[-1e6, -75e4]
						],
						[
							[1e6, -75e4],
							[15e5, 0],
							[15e5, 0],
							[1e6, 75e4]
						],
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
							[-5e6, 8e6],
							[-3e6, 8e6],
							[-3e6, 6e6],
							[-5e6, 6e6]
						]],
						[[
							[-3e6, 6e6],
							[-2e6, 8e6],
							[0, 8e6],
							[0, 6e6],
							[-3e6, 6e6]
						]],
						[[
							[1e6, 6e6],
							[1e6, 8e6],
							[3e6, 8e6],
							[3e6, 6e6],
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
								[1e6, -5e6],
								[2e6, -35e5],
								[3e6, -5e6],
								[1e6, -5e6]
							]]
						},
						{
							"type": "Polygon",
							"coordinates": [[
								[1e6, -5e6],
								[2e6, -65e5],
								[3e6, -5e6],
								[1e6, -5e6]
							]]
						}
					]
				}
			}
		]
	}) }),
	style: styleFunction
});
var overlayStyle = (function() {
	const styles = {};
	styles["Polygon"] = [
		new Style({ fill: new Fill({ color: [
			255,
			255,
			255,
			.5
		] }) }),
		new Style({ stroke: new Stroke({
			color: [
				255,
				255,
				255,
				1
			],
			width: 5
		}) }),
		new Style({ stroke: new Stroke({
			color: [
				0,
				153,
				255,
				1
			],
			width: 3
		}) })
	];
	styles["MultiPolygon"] = styles["Polygon"];
	styles["LineString"] = [new Style({ stroke: new Stroke({
		color: [
			255,
			255,
			255,
			1
		],
		width: 5
	}) }), new Style({ stroke: new Stroke({
		color: [
			0,
			153,
			255,
			1
		],
		width: 3
	}) })];
	styles["MultiLineString"] = styles["LineString"];
	styles["Point"] = [new Style({
		image: new CircleStyle({
			radius: 7,
			fill: new Fill({ color: [
				0,
				153,
				255,
				1
			] }),
			stroke: new Stroke({
				color: [
					255,
					255,
					255,
					.75
				],
				width: 1.5
			})
		}),
		zIndex: 1e5
	})];
	styles["MultiPoint"] = styles["Point"];
	styles["GeometryCollection"] = styles["Polygon"].concat(styles["Point"]);
	return function(feature) {
		return styles[feature.getGeometry().getType()];
	};
})();
var select = new Select({ style: overlayStyle });
var modify = new Modify({
	features: select.getFeatures(),
	style: overlayStyle,
	insertVertexCondition: function() {
		return !select.getFeatures().getArray().every(function(feature) {
			return /Polygon/.test(feature.getGeometry().getType());
		});
	}
});
new Map({
	interactions: defaults().extend([select, modify]),
	layers: [layer],
	target: "map",
	view: new View({
		center: [0, 1e6],
		zoom: 2,
		multiWorld: true
	})
});
//#endregion

//# sourceMappingURL=modify-test.js.map