import { Cn as OSM, Ht as WebGLTileLayer, Mn as Map, N as GeoZarr, cr as withExtentCenter, dr as withZoom, lr as withHigherResolutions, sr as getView, ur as withLowerResolutions } from "./common.js";
//#region examples/geozarr.js
var select = document.getElementById("url-select");
var input = document.getElementById("custom-url");
var button = document.getElementById("load-url");
function getUrl() {
	return select.value === "custom" ? input.value : select.value;
}
select.addEventListener("change", () => {
	if (select.value === "custom") {
		input.style.display = "";
		input.focus();
	} else input.style.display = "none";
});
var map;
function render() {
	const url = getUrl();
	if (!url) return;
	const source = new GeoZarr({
		url,
		bands: [
			"b04",
			"b03",
			"b02"
		]
	});
	if (map) map.setTarget(null);
	map = new Map({
		layers: [new WebGLTileLayer({ source: new OSM() }), new WebGLTileLayer({
			style: {
				gamma: 1.5,
				color: [
					"color",
					[
						"interpolate",
						["linear"],
						["band", 1],
						0,
						0,
						.5,
						255
					],
					[
						"interpolate",
						["linear"],
						["band", 2],
						0,
						0,
						.5,
						255
					],
					[
						"interpolate",
						["linear"],
						["band", 3],
						0,
						0,
						.5,
						255
					]
				]
			},
			source
		})],
		target: "map",
		view: getView(source, withLowerResolutions(1), withHigherResolutions(2), withExtentCenter(), withZoom(2))
	});
}
button.addEventListener("click", render);
render();
//#endregion

//# sourceMappingURL=geozarr.js.map