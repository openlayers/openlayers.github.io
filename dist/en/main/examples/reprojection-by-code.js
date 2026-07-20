import { Br as applyTransform, Bt as register, Cn as OSM, Er as getTransform, Fn as Stroke, It as proj4, Mn as Map, Qt as TileDebug, jn as TileLayer, or as View, ot as Graticule, wr as get } from "./common.js";
//#region examples/reprojection-by-code.js
var key = "get_your_own_D6rA4zTHduk6KOKTXzGB";
var osmSource = new OSM();
var debugLayer = new TileLayer({
	source: new TileDebug({
		tileGrid: osmSource.getTileGrid(),
		projection: osmSource.getProjection()
	}),
	visible: false
});
var graticule = new Graticule({
	strokeStyle: new Stroke({
		color: "rgba(255,120,0,0.9)",
		width: 2,
		lineDash: [.5, 4]
	}),
	showLabels: true,
	visible: false,
	wrapX: false
});
var map = new Map({
	layers: [
		new TileLayer({ source: osmSource }),
		debugLayer,
		graticule
	],
	target: "map",
	view: new View({
		projection: "EPSG:3857",
		center: [0, 0],
		zoom: 1
	})
});
var queryInput = document.getElementById("epsg-query");
var searchButton = document.getElementById("epsg-search");
var resultSpan = document.getElementById("epsg-result");
var renderEdgesCheckbox = document.getElementById("render-edges");
var showTilesCheckbox = document.getElementById("show-tiles");
var showGraticuleCheckbox = document.getElementById("show-graticule");
function setProjection(code, name, proj4def, bbox) {
	if (code === null || name === null || proj4def === null || bbox === null) {
		resultSpan.innerHTML = "Nothing usable found, using EPSG:3857...";
		map.setView(new View({
			projection: "EPSG:3857",
			center: [0, 0],
			zoom: 1
		}));
		return;
	}
	resultSpan.innerHTML = "(" + code + ") " + name;
	proj4.defs(code, proj4def);
	register(proj4);
	const newProj = get(code);
	const fromLonLat = getTransform("EPSG:4326", newProj);
	newProj.setWorldExtent(bbox);
	if (bbox[0] > bbox[2]) bbox[2] += 360;
	const extent = applyTransform(bbox, fromLonLat, void 0, 8);
	newProj.setExtent(extent);
	const newView = new View({ projection: newProj });
	map.setView(newView);
	newView.fit(extent);
}
function search(query) {
	resultSpan.innerHTML = "Searching ...";
	fetch(`https://api.maptiler.com/coordinates/search/${query}.json?exports=true&key=${key}`).then(function(response) {
		return response.json();
	}).then(function(json) {
		const results = json["results"];
		if (results && results.length > 0) for (let i = 0, ii = results.length; i < ii; i++) {
			const result = results[i];
			if (result) {
				const id = result["id"];
				const code = id["authority"] + ":" + id["code"];
				const name = result["name"];
				const proj4def = result["exports"]["wkt"];
				const bbox = result["bbox"];
				if (code && code.length > 0 && proj4def && proj4def.length > 0 && bbox && bbox.length == 4) {
					setProjection(code, name, proj4def, bbox);
					return;
				}
			}
		}
		setProjection(null, null, null, null);
	});
}
/**
* Handle click event.
* @param {Event} event The event.
*/
searchButton.onclick = function(event) {
	search(queryInput.value);
	event.preventDefault();
};
/**
* Handle checkbox change events.
*/
function onReprojectionChange() {
	osmSource.setRenderReprojectionEdges(renderEdgesCheckbox.checked);
}
function onGraticuleChange() {
	graticule.setVisible(showGraticuleCheckbox.checked);
}
function onTilesChange() {
	debugLayer.setVisible(showTilesCheckbox.checked);
}
showGraticuleCheckbox.addEventListener("change", onGraticuleChange);
renderEdgesCheckbox.addEventListener("change", onReprojectionChange);
showTilesCheckbox.addEventListener("change", onTilesChange);
onReprojectionChange();
onGraticuleChange();
onTilesChange();
//#endregion

//# sourceMappingURL=reprojection-by-code.js.map