import { Cn as OSM, J as DragAndDrop, Mn as Map, Q as unzipSync, Wn as defaults, X as IGC, Y as TopoJSON, Z as GPX, bn as VectorLayer, dn as VectorSource, jn as TileLayer, or as View, rn as GeoJSON, tn as KML } from "./common.js";
//#region examples/drag-and-drop-custom-kmz.js
var zip;
function getKMLData(buffer) {
	zip = unzipSync(new Uint8Array(buffer));
	const kml = Object.keys(zip).find((key) => /\.kml$/i.test(key));
	if (!(kml in zip)) return null;
	return new TextDecoder().decode(zip[kml]);
}
function getKMLImage(href) {
	const index = window.location.href.lastIndexOf("/");
	if (index === -1) return href;
	const image = href.slice(index + 1);
	if (!(image in zip)) return href;
	return URL.createObjectURL(new Blob([zip[image]]));
}
var KMZ = class extends KML {
	constructor(opt_options) {
		const options = opt_options || {};
		options.iconUrlFunction = getKMLImage;
		super(options);
	}
	getType() {
		return "arraybuffer";
	}
	readFeature(source, options) {
		const kmlData = getKMLData(source);
		return super.readFeature(kmlData, options);
	}
	readFeatures(source, options) {
		const kmlData = getKMLData(source);
		return super.readFeatures(kmlData, options);
	}
};
var dragAndDropInteraction = new DragAndDrop({ formatConstructors: [
	KMZ,
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
	const features = map.getFeaturesAtPixel(pixel);
	let html;
	if (features.length > 0) {
		const info = [];
		for (let i = 0, ii = features.length; i < ii; ++i) {
			const description = features[i].get("description") || features[i].get("name") || features[i].get("_name") || features[i].get("layer");
			if (description) info.push(description);
		}
		html = info.join("<br/>");
	}
	document.getElementById("info").innerHTML = html ?? "";
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
	fetch(fullpath).then((response) => response.blob()).then(function(blob) {
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		link.click();
	});
}
document.getElementById("download-kmz").addEventListener("click", function() {
	download("data/kmz/iceland.kmz", "iceland.kmz");
});
//#endregion

//# sourceMappingURL=drag-and-drop-custom-kmz.js.map