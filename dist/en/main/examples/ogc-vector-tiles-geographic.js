import { $t as VectorTileLayer, Et as OGCVectorTile, Mn as Map, en as MVT, or as View } from "./common.js";
//#region examples/ogc-vector-tiles-geographic.js
new Map({
	target: "map",
	layers: [new VectorTileLayer({
		source: new OGCVectorTile({
			url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/tiles/WorldCRS84Quad",
			format: new MVT(),
			projection: "EPSG:4326"
		}),
		background: "#d1d1d1",
		style: {
			"stroke-width": .6,
			"stroke-color": "#8c8b8b",
			"fill-color": "#f7f7e9"
		}
	})],
	view: new View({
		center: [0, 0],
		zoom: 1,
		projection: "EPSG:4326"
	})
});
//#endregion

//# sourceMappingURL=ogc-vector-tiles-geographic.js.map