import { Cn as OSM, M as Link, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/link.js
var map = new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var link = new Link();
var exampleCheckbox = document.getElementById("example-checkbox");
exampleCheckbox.addEventListener("change", function() {
	if (exampleCheckbox.checked) link.update("example", "checked");
	else link.update("example", null);
});
exampleCheckbox.checked = link.track("example", (newValue) => {
	exampleCheckbox.checked = newValue === "checked";
}) === "checked";
map.addInteraction(link);
//#endregion

//# sourceMappingURL=link.js.map