import { $t as VectorTileLayer, An as TileGrid, Fn as Stroke, In as Icon, Ln as Fill, Mn as Map, Nn as Text, Pn as Style, Zt as VectorTile, en as MVT, or as View, wr as get } from "./common.js";
//#region examples/mapbox-vector-tiles-advanced.js
var resolutions = [];
for (let i = 0; i <= 8; ++i) resolutions.push(156543.03392804097 / Math.pow(2, i * 2));
function tileUrlFunction(tileCoord) {
	return "https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ".replace("{z}", String(tileCoord[0] * 2 - 1)).replace("{x}", String(tileCoord[1])).replace("{y}", String(tileCoord[2])).replace("{a-d}", "abcd".substr(((tileCoord[1] << tileCoord[0]) + tileCoord[2]) % 4, 1));
}
new Map({
	layers: [new VectorTileLayer({
		source: new VectorTile({
			attributions: "© <a href=\"https://www.mapbox.com/map-feedback/\">Mapbox</a> © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>",
			format: new MVT(),
			tileGrid: new TileGrid({
				extent: get("EPSG:3857").getExtent(),
				resolutions,
				tileSize: 512
			}),
			tileUrlFunction
		}),
		style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text)
	})],
	target: "map",
	view: new View({
		center: [0, 0],
		minZoom: 1,
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=mapbox-vector-tiles-advanced.js.map