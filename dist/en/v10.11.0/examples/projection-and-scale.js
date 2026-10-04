import { Cn as OSM, Mn as Map, Or as transform, Tr as getPointResolution, U as ScaleLine, jn as TileLayer, or as View, rr as defaults, wr as get } from "./common.js";
//#region examples/projection-and-scale.js
var viewProjSelect = document.getElementById("view-projection");
var projection = get(viewProjSelect.value);
var scaleControl = new ScaleLine({
	units: "metric",
	bar: true,
	steps: 4,
	text: true,
	minWidth: 140
});
var map = new Map({
	controls: defaults().extend([scaleControl]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: transform([0, 52], "EPSG:4326", projection),
		zoom: 6,
		projection
	})
});
function onChangeProjection() {
	const currentView = map.getView();
	const currentProjection = currentView.getProjection();
	const newProjection = get(viewProjSelect.value);
	const currentResolution = currentView.getResolution();
	const currentCenter = currentView.getCenter();
	const currentRotation = currentView.getRotation();
	const newCenter = transform(currentCenter, currentProjection, newProjection);
	const currentMPU = currentProjection.getMetersPerUnit();
	const newMPU = newProjection.getMetersPerUnit();
	const currentPointResolution = getPointResolution(currentProjection, 1 / currentMPU, currentCenter, "m") * currentMPU;
	const newPointResolution = getPointResolution(newProjection, 1 / newMPU, newCenter, "m") * newMPU;
	const newView = new View({
		center: newCenter,
		resolution: currentResolution * currentPointResolution / newPointResolution,
		rotation: currentRotation,
		projection: newProjection
	});
	map.setView(newView);
}
viewProjSelect.addEventListener("change", onChangeProjection);
//#endregion

//# sourceMappingURL=projection-and-scale.js.map