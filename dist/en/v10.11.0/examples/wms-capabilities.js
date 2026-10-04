import { c as WMSCapabilities } from "./common.js";
//#region examples/wms-capabilities.js
var parser = new WMSCapabilities();
fetch("data/ogcsample.xml").then(function(response) {
	return response.text();
}).then(function(text) {
	const result = parser.read(text);
	document.getElementById("log").innerText = JSON.stringify(result, null, 2);
});
//#endregion

//# sourceMappingURL=wms-capabilities.js.map