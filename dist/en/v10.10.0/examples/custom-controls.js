import { Cn as OSM, Mn as Map, ar as Control, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/custom-controls.js
var RotateNorthControl = class extends Control {
	/**
	* @param {Object} [opt_options] Control options.
	*/
	constructor(opt_options) {
		const options = opt_options || {};
		const button = document.createElement("button");
		button.innerHTML = "N";
		const element = document.createElement("div");
		element.className = "rotate-north ol-unselectable ol-control";
		element.appendChild(button);
		super({
			element,
			target: options.target
		});
		button.addEventListener("click", this.handleRotateNorth.bind(this), false);
	}
	handleRotateNorth() {
		this.getMap().getView().setRotation(0);
	}
};
new Map({
	controls: defaults().extend([new RotateNorthControl()]),
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 3,
		rotation: 1
	})
});
//#endregion

//# sourceMappingURL=custom-controls.js.map