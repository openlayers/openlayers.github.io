import { Cr as fromLonLat, Dn as createXYZ, G as Modify, Gt as Draw, Mn as Map, Wn as defaults, an as ImageTileSource, bn as VectorLayer, dn as VectorSource, jn as TileLayer, m as EsriJSON, nn as Select, or as View, vn as tile } from "./common.js";
//#region examples/vector-esri-edit.js
var esrijsonFormat = new EsriJSON();
var vectorSource = new VectorSource({
	loader: async (extent, resolution, projection) => {
		const url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=" + encodeURIComponent("{\"xmin\":" + extent[0] + ",\"ymin\":" + extent[1] + ",\"xmax\":" + extent[2] + ",\"ymax\":" + extent[3] + ",\"spatialReference\":{\"wkid\":102100}}") + "&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100";
		const json = await (await fetch(url)).json();
		if (json.error) {
			alert(json.error.message + "\n" + json.error.details.join("\n"));
			throw new Error(json.error.message);
		} else return esrijsonFormat.readFeatures(json, { featureProjection: projection });
	},
	strategy: tile(createXYZ({ tileSize: 512 }))
});
var vector = new VectorLayer({ source: vectorSource });
var raster = new TileLayer({ source: new ImageTileSource({
	attributions: "Tiles © <a href=\"https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer\">ArcGIS</a>",
	url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
}) });
var draw = new Draw({
	source: vectorSource,
	type: "Polygon"
});
var select = new Select();
select.setActive(false);
var selected = select.getFeatures();
var modify = new Modify({ features: selected });
modify.setActive(false);
var map = new Map({
	interactions: defaults().extend([
		draw,
		select,
		modify
	]),
	layers: [raster, vector],
	target: document.getElementById("map"),
	view: new View({
		center: fromLonLat([-110.875, 37.345]),
		zoom: 5
	})
});
var typeSelect = document.getElementById("type");
/**
* Let user change the interaction type.
*/
typeSelect.onchange = function() {
	draw.setActive(typeSelect.value === "DRAW");
	select.setActive(typeSelect.value === "MODIFY");
	modify.setActive(typeSelect.value === "MODIFY");
};
var dirty = {};
selected.on("add", function(evt) {
	evt.element.on("change", function(evt) {
		dirty[evt.target.get("objectid")] = true;
	});
});
selected.on("remove", function(evt) {
	const feature = evt.element;
	const fid = feature.get("objectid");
	if (dirty[fid] === true) {
		const payload = "[" + esrijsonFormat.writeFeature(feature, { featureProjection: map.getView().getProjection() }) + "]";
		fetch("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2/updateFeatures", {
			method: "POST",
			body: new URLSearchParams({
				f: "json",
				features: payload
			}),
			headers: { "Content-Type": "application/x-www-form-urlencoded" }
		}).then((response) => response.json()).then((data) => {
			const result = typeof data === "string" ? JSON.parse(data) : data;
			if (result.updateResults && result.updateResults.length > 0) if (result.updateResults[0].success !== true) {
				const error = result.updateResults[0].error;
				alert(error.description + " (" + error.code + ")");
			} else delete dirty[fid];
		});
	}
});
draw.on("drawend", function(evt) {
	const feature = evt.feature;
	const payload = "[" + esrijsonFormat.writeFeature(feature, { featureProjection: map.getView().getProjection() }) + "]";
	fetch("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2/addFeatures", {
		method: "POST",
		body: new URLSearchParams({
			f: "json",
			features: payload
		}),
		headers: { "Content-Type": "application/x-www-form-urlencoded" }
	}).then((response) => response.json()).then((data) => {
		const result = typeof data === "string" ? JSON.parse(data) : data;
		if (result.addResults && result.addResults.length > 0) if (result.addResults[0].success === true) feature.set("objectid", result.addResults[0]["objectId"]);
		else {
			const error = result.addResults[0].error;
			alert(error.description + " (" + error.code + ")");
		}
	});
});
//#endregion

//# sourceMappingURL=vector-esri-edit.js.map