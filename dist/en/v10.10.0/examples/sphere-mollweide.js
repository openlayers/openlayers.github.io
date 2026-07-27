import { Bt as register, It as proj4, Mn as Map, bn as VectorLayer, dn as VectorSource, jr as Projection, or as View, ot as Graticule, rn as GeoJSON } from "./common.js";
//#region examples/sphere-mollweide.js
proj4.defs("ESRI:53009", "+proj=moll +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs");
register(proj4);
var sphereMollweideProjection = new Projection({
	code: "ESRI:53009",
	extent: [
		-18019909.21177587,
		-9009954.605703328,
		18019909.21177587,
		9009954.605703328
	],
	worldExtent: [
		-179,
		-89.99,
		179,
		89.99
	]
});
new Map({
	keyboardEventTarget: document,
	layers: [new VectorLayer({
		source: new VectorSource({
			url: "https://openlayers.org/data/vector/ecoregions.json",
			format: new GeoJSON()
		}),
		style: { "fill-color": [
			"string",
			["get", "COLOR_BIO"],
			"#eee"
		] }
	}), new Graticule()],
	target: "map",
	view: new View({
		center: [0, 0],
		projection: sphereMollweideProjection,
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=sphere-mollweide.js.map