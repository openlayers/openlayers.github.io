import { Cn as OSM, Dn as createXYZ, J as DragAndDrop, Mn as Map, Wn as defaults, X as IGC, Y as TopoJSON, Z as GPX, bn as VectorLayer, dn as VectorSource, en as MVT, jn as TileLayer, or as View, rn as GeoJSON, tn as KML, xn as Feature } from "./common.js";
//#region examples/drag-and-drop-custom-mvt.js
var tileCoordZ = document.getElementById("tileCoordZ");
var tileCoordX = document.getElementById("tileCoordX");
var tileCoordY = document.getElementById("tileCoordY");
var customMVT = class extends MVT {
	constructor() {
		super({ featureClass: Feature });
	}
	readFeatures(source, options) {
		options.extent = createXYZ().getTileCoordExtent([
			parseInt(tileCoordZ.value),
			parseInt(tileCoordX.value),
			parseInt(tileCoordY.value)
		]);
		return super.readFeatures(source, options);
	}
};
var dragAndDropInteraction = new DragAndDrop({ formatConstructors: [
	customMVT,
	GPX,
	GeoJSON,
	IGC,
	KML,
	TopoJSON
] });
var map = new Map({
	interactions: defaults().extend([dragAndDropInteraction]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
dragAndDropInteraction.on("addfeatures", function(event) {
	const vectorSource = new VectorSource({ features: event.features });
	map.addLayer(new VectorLayer({ source: vectorSource }));
	map.getView().fit(vectorSource.getExtent());
});
var displayFeatureInfo = function(pixel) {
	const features = [];
	map.forEachFeatureAtPixel(pixel, function(feature) {
		features.push(feature);
	});
	if (features.length > 0) {
		const info = [];
		let i, ii;
		for (i = 0, ii = features.length; i < ii; ++i) {
			const description = features[i].get("name") || features[i].get("_name") || features[i].get("layer");
			if (description) info.push(description);
		}
		document.getElementById("info").innerHTML = info.join(", ") || "&nbsp";
	} else document.getElementById("info").innerHTML = "&nbsp;";
};
map.on("pointermove", function(evt) {
	if (evt.dragging) return;
	displayFeatureInfo(evt.pixel);
});
map.on("click", function(evt) {
	displayFeatureInfo(evt.pixel);
});
var link = document.getElementById("download");
function download(fullpath, filename) {
	fetch(fullpath).then(function(response) {
		return response.blob();
	}).then(function(blob) {
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		link.click();
	});
}
document.getElementById("download-mvt").addEventListener("click", function() {
	download("https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/" + tileCoordZ.value + "/" + tileCoordY.value + "/" + tileCoordX.value + ".pbf", tileCoordZ.value + "-" + tileCoordX.value + "-" + tileCoordY.value + ".mvt");
});
//#endregion

//# sourceMappingURL=drag-and-drop-custom-mvt.js.map