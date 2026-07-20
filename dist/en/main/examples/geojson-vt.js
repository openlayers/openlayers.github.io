import { $t as VectorTileLayer, Mn as Map, P as geojsonvt, Zt as VectorTile, jr as Projection, or as View, rn as GeoJSON } from "./common.js";
//#region examples/geojson-vt.js
var replacer = function(key, value) {
	if (!value || !value.geometry) return value;
	let type;
	const rawType = value.type;
	let geometry = value.geometry;
	if (rawType === 1) {
		type = "MultiPoint";
		if (geometry.length == 1) {
			type = "Point";
			geometry = geometry[0];
		}
	} else if (rawType === 2) {
		type = "MultiLineString";
		if (geometry.length == 1) {
			type = "LineString";
			geometry = geometry[0];
		}
	} else if (rawType === 3) {
		type = "Polygon";
		if (geometry.length > 1) {
			type = "MultiPolygon";
			geometry = [geometry];
		}
	}
	return {
		"type": "Feature",
		"geometry": {
			"type": type,
			"coordinates": geometry
		},
		"properties": value.tags
	};
};
var layer = new VectorTileLayer({
	background: "#1a2b39",
	style: { "fill-color": [
		"string",
		["get", "COLOR"],
		"#eee"
	] }
});
var map = new Map({
	layers: [layer],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
fetch("https://openlayers.org/data/vector/ecoregions.json").then(function(response) {
	return response.json();
}).then(function(json) {
	const tileIndex = geojsonvt(json, {
		extent: 4096,
		debug: 1
	});
	const format = new GeoJSON({ dataProjection: new Projection({
		code: "TILE_PIXELS",
		units: "tile-pixels",
		extent: [
			0,
			0,
			4096,
			4096
		]
	}) });
	const vectorSource = new VectorTile({
		tileUrlFunction: function(tileCoord) {
			return JSON.stringify(tileCoord);
		},
		tileLoadFunction: function(tile, url) {
			const tileCoord = JSON.parse(url);
			const data = tileIndex.getTile(tileCoord[0], tileCoord[1], tileCoord[2]);
			const geojson = JSON.stringify({
				type: "FeatureCollection",
				features: data ? data.features : []
			}, replacer);
			const features = format.readFeatures(geojson, {
				extent: vectorSource.getTileGrid().getTileCoordExtent(tileCoord),
				featureProjection: map.getView().getProjection()
			});
			tile.setFeatures(features);
		}
	});
	layer.setSource(vectorSource);
});
//#endregion

//# sourceMappingURL=geojson-vt.js.map