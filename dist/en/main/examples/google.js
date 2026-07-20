import { Ft as Google, Ht as WebGLTileLayer, Mn as Map, ar as Control, or as View, rr as defaults } from "./common.js";
//#region examples/google.js
function showMap(key) {
	const source = new Google({
		key,
		scale: "scaleFactor2x",
		highDpi: true
	});
	source.on("change", () => {
		if (source.getState() === "error") alert(source.getError());
	});
	class GoogleLogoControl extends Control {
		constructor() {
			const element = document.createElement("img");
			element.style.pointerEvents = "none";
			element.style.position = "absolute";
			element.style.bottom = "5px";
			element.style.left = "5px";
			element.src = "https://developers.google.com/static/maps/documentation/images/google_on_white.png";
			super({ element });
		}
	}
	new Map({
		layers: [new WebGLTileLayer({ source })],
		controls: defaults().extend([new GoogleLogoControl()]),
		target: "map",
		view: new View({
			center: [0, 0],
			zoom: 2
		})
	});
}
document.getElementById("key-form").addEventListener("submit", (event) => {
	showMap(event.target.elements["key"].value);
});
//#endregion

//# sourceMappingURL=google.js.map