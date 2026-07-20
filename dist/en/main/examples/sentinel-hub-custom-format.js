import { Ar as useGeographic, Ht as WebGLTileLayer, Mn as Map, or as View, v as SentinelHub } from "./common.js";
//#region examples/sentinel-hub-custom-format.js
useGeographic();
var source = new SentinelHub({
	data: [{
		type: "sentinel-2-l2a",
		dataFilter: { timeRange: {
			from: "2024-05-30T00:00:00Z",
			to: "2024-06-01T00:00:00Z"
		} }
	}],
	evalscript: {
		setup: () => ({
			input: [
				"B12",
				"B08",
				"B04"
			],
			output: { bands: 3 }
		}),
		evaluatePixel: (sample) => [
			2.5 * sample.B12,
			2 * sample.B08,
			2 * sample.B04
		]
	},
	format: "image/png"
});
new Map({
	layers: [new WebGLTileLayer({ source })],
	target: "map",
	view: new View({
		center: [-121.75, 46.85],
		zoom: 10,
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
var format = document.getElementById("format");
function updateInputData() {
	source.setFormat(format.value);
}
format.addEventListener("change", () => updateInputData());
updateInputData();
source.on("change", () => {
	if (source.getState() === "error") alert(source.getError());
});
//#endregion

//# sourceMappingURL=sentinel-hub-custom-format.js.map