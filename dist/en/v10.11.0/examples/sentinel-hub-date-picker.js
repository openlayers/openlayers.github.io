import { Ar as useGeographic, Ht as WebGLTileLayer, Mn as Map, or as View, v as SentinelHub } from "./common.js";
//#region examples/sentinel-hub-date-picker.js
useGeographic();
var source = new SentinelHub({ evalscript: {
	setup: () => ({
		input: [
			"B02",
			"B03",
			"B04"
		],
		output: { bands: 3 }
	}),
	evaluatePixel: (sample) => [
		3 * sample.B04,
		3 * sample.B03,
		3 * sample.B02
	]
} });
new Map({
	layers: [new WebGLTileLayer({ source })],
	target: "map",
	view: new View({
		center: [-108.6, 43.185],
		zoom: 12,
		minZoom: 7,
		maxZoom: 13
	})
});
document.getElementById("auth-form").addEventListener("submit", (event) => {
	const clientId = event.target.elements["id"].value;
	const clientSecret = event.target.elements["secret"].value;
	source.setAuth({
		clientId,
		clientSecret
	});
});
var picker = document.getElementById("to-date");
function updateInputData() {
	const toDate = new Date(picker.value);
	const fromDate = new Date(toDate.getTime());
	fromDate.setDate(fromDate.getDate() - 7);
	source.setData([{
		type: "sentinel-2-l2a",
		dataFilter: { timeRange: {
			from: fromDate.toISOString(),
			to: toDate.toISOString()
		} }
	}]);
}
picker.addEventListener("change", () => updateInputData());
updateInputData();
source.on("change", () => {
	if (source.getState() === "error") alert(source.getError());
});
//#endregion

//# sourceMappingURL=sentinel-hub-date-picker.js.map