import { Ht as WebGLTileLayer, Mn as Map, an as ImageTileSource, or as View } from "./common.js";
//#region examples/webgl-tile-style.js
var attributions = "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>";
var variables = {
	exposure: 0,
	contrast: 0,
	saturation: 0
};
var layer = new WebGLTileLayer({
	style: {
		exposure: ["var", "exposure"],
		contrast: ["var", "contrast"],
		saturation: ["var", "saturation"],
		variables
	},
	source: new ImageTileSource({
		attributions,
		url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
		tileSize: 512,
		maxZoom: 20
	})
});
new Map({
	target: "map",
	layers: [layer],
	view: new View({
		center: [0, 0],
		zoom: 0
	})
});
var variable;
for (variable in variables) {
	const name = variable;
	const element = document.getElementById(name);
	const value = variables[name];
	element.value = value.toString();
	document.getElementById(name + "-value").innerText = value.toFixed(2);
	element.addEventListener("input", function(event) {
		const value = parseFloat(event.target.value);
		document.getElementById(name + "-value").innerText = value.toFixed(2);
		layer.updateStyleVariables({ [name]: value });
	});
}
//#endregion

//# sourceMappingURL=webgl-tile-style.js.map