import { $t as VectorTileLayer, Ar as useGeographic, Mn as Map, Tt as OGCVectorTile, en as MVT, it as applyStyle, or as View } from "./common.js";
//#region examples/ogc-api-tiles-ol-mapbox-style.js
useGeographic();
var api = "https://api.pdok.nl/kadaster/brt-achtergrondkaart/ogc/v1";
var title = "BRT Achtergrondkaart";
var layer = new VectorTileLayer({
	declutter: true,
	properties: { title },
	source: new OGCVectorTile({
		url: "https://api.pdok.nl/kadaster/brt-achtergrondkaart/ogc/v1/tiles/WebMercatorQuad",
		format: new MVT(),
		attributions: `<a href="${api}">${title}</a> © <a href="https://www.kadaster.nl/">Kadaster</a>`
	})
});
applyStyle(layer, "https://api.pdok.nl/kadaster/brt-achtergrondkaart/ogc/v1/styles/standaard__webmercatorquad", { updateSource: false });
new Map({
	target: "map",
	layers: [layer],
	view: new View({
		center: [5.387201, 52.155172],
		zoom: 7
	})
});
//#endregion

//# sourceMappingURL=ogc-api-tiles-ol-mapbox-style.js.map