import { b as WMTSCapabilities } from "./common.js";
//#region examples/wmts-capabilities.js
var parser = new WMTSCapabilities();
fetch("data/WMTSCapabilities.xml").then(function(response) {
	return response.text();
}).then(function(text) {
	const result = parser.read(text);
	document.getElementById("log").innerText = JSON.stringify(result, null, 2);
});
//#endregion

//# sourceMappingURL=wmts-capabilities.js.map