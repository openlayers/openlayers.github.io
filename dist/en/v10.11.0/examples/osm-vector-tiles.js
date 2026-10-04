import { $t as VectorTileLayer, Cr as fromLonLat, Mn as Map, Y as TopoJSON, Zt as VectorTile, or as View } from "./common.js";
//#region examples/osm-vector-tiles.js
new Map({
	layers: [new VectorTileLayer({
		source: new VectorTile({
			attributions: "&copy; OpenStreetMap contributors, Who’s On First, Natural Earth, and osmdata.openstreetmap.de",
			format: new TopoJSON({
				layerName: "layer",
				layers: [
					"water",
					"roads",
					"buildings"
				]
			}),
			maxZoom: 16,
			url: "https://tile.nextzen.org/tilezen/vector/v1/all/{z}/{x}/{y}.topojson?api_key=uZNs91nMR-muUTP99MyBSg"
		}),
		style: [
			{
				filter: [
					"==",
					["get", "layer"],
					"water"
				],
				style: { "fill-color": "#9db9e8" }
			},
			{
				else: true,
				filter: [
					"all",
					[
						"==",
						["get", "layer"],
						"roads"
					],
					["get", "railway"]
				],
				style: {
					"stroke-color": "#7de",
					"stroke-width": 1,
					"z-index": [
						"number",
						["get", "sort_key"],
						0
					]
				}
			},
			{
				else: true,
				filter: [
					"==",
					["get", "layer"],
					"roads"
				],
				style: {
					"stroke-color": [
						"match",
						["get", "kind"],
						"major_road",
						"#776",
						"minor_road",
						"#ccb",
						"highway",
						"#f39",
						"none"
					],
					"stroke-width": [
						"match",
						["get", "kind"],
						"highway",
						1.5,
						1
					],
					"z-index": [
						"number",
						["get", "sort_key"],
						0
					]
				}
			},
			{
				else: true,
				filter: [
					"all",
					[
						"==",
						["get", "layer"],
						"buildings"
					],
					[
						"<",
						["resolution"],
						10
					]
				],
				style: {
					"fill-color": "#6666",
					"stroke-color": "#4446",
					"stroke-width": 1,
					"z-index": [
						"number",
						["get", "sort_key"],
						0
					]
				}
			}
		]
	})],
	target: "map",
	view: new View({
		center: fromLonLat([-74.0064, 40.7142]),
		maxZoom: 19,
		zoom: 15
	})
});
//#endregion

//# sourceMappingURL=osm-vector-tiles.js.map