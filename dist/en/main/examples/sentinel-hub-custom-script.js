import { Ar as useGeographic, Ht as WebGLTileLayer, Mn as Map, _ as EditorView, g as javascript, h as basicSetup, or as View, v as SentinelHub } from "./common.js";
//#region examples/sentinel-hub-custom-script.js
useGeographic();
var source = new SentinelHub({ data: [{
	type: "sentinel-2-l2a",
	dataFilter: { timeRange: {
		from: "2024-05-15T00:00:00Z",
		to: "2024-05-25T00:00:00Z"
	} }
}] });
new Map({
	layers: [new WebGLTileLayer({ source })],
	target: "map",
	view: new View({
		center: [30.674, 29.935],
		zoom: 10,
		minZoom: 13,
		maxZoom: 15
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
var script = `//VERSION=3
function setup() {
  return {
    input: ['B02', 'B03', 'B04', 'B08', 'B11'],
    output: {bands: 3},
  };
}

function evaluatePixel(sample) {
  // Normalized Difference Moisture Index
  const ndmi = (sample.B08 - sample.B11) / (sample.B08 + sample.B11);
  if (ndmi <= 0) {
    return [3 * sample.B04, 3 * sample.B03, 3 * sample.B02];
  }
  if (ndmi <= 0.2) {
    return [0, 0.8, 0.9];
  }
  if (ndmi <= 0.4) {
    return [0, 0.5, 0.9];
  }
  return [0, 0, 0.7];
}`;
var editor = new EditorView({
	doc: script,
	extensions: [basicSetup, javascript()],
	parent: document.getElementById("evalscript")
});
document.getElementById("evalscript-form").addEventListener("submit", (event) => {
	event.preventDefault();
	source.setEvalscript(editor.state.doc.toString());
});
source.setEvalscript(script);
source.on("change", () => {
	if (source.getState() === "error") alert(source.getError());
});
//#endregion

//# sourceMappingURL=sentinel-hub-custom-script.js.map