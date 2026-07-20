import { Mn as Map, bn as VectorLayer, dn as VectorSource, or as View, rn as GeoJSON } from "./common.js";
//#region examples/style-expressions.js
var format = new GeoJSON();
new Map({
	layers: [
		new VectorLayer({
			background: "#1a2b39",
			source: new VectorSource({
				url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_land.geojson",
				format
			}),
			style: { "fill-color": "darkgray" }
		}),
		new VectorLayer({
			source: new VectorSource({
				url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson",
				format
			}),
			style: {
				"circle-radius": ["get", "scalerank"],
				"circle-fill-color": "gray",
				"circle-stroke-color": "white",
				"circle-stroke-width": .5
			}
		}),
		new VectorLayer({
			source: new VectorSource({
				url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson",
				format
			}),
			declutter: true,
			style: [{
				filter: [
					">",
					["get", "pop_max"],
					1e7
				],
				style: {
					"text-value": [
						"concat",
						["get", "adm1name"],
						", ",
						["get", "adm0name"]
					],
					"text-font": "16px sans-serif",
					"text-fill-color": "white",
					"text-stroke-color": "gray",
					"text-stroke-width": 2
				}
			}, {
				else: true,
				filter: [
					">",
					["get", "pop_max"],
					5e6
				],
				style: {
					"text-value": ["get", "nameascii"],
					"text-font": "12px sans-serif",
					"text-fill-color": "white",
					"text-stroke-color": "gray",
					"text-stroke-width": 2
				}
			}]
		})
	],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 1
	})
});
//#endregion

//# sourceMappingURL=style-expressions.js.map