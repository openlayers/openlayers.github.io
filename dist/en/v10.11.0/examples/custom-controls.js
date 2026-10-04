import { Cn as OSM, Mn as Map, ar as Control, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/custom-controls.js
var northArrow = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2 5 21l7-4z\"/><path d=\"M12 2l7 19-7-4z\" opacity=\".5\"/></svg>";
var RotateNorthControl = class extends Control {
	/**
	* @param {Object} [opt_options] Control options.
	*/
	constructor(opt_options) {
		const options = opt_options || {};
		const button = document.createElement("button");
		button.type = "button";
		button.title = "Rotate to north";
		button.innerHTML = northArrow;
		const element = document.createElement("div");
		element.className = "rotate-north ol-unselectable ol-control";
		element.appendChild(button);
		super({
			element,
			target: options.target
		});
		/**
		* The north arrow, rotated together with the map.
		* @type {SVGElement}
		* @private
		*/
		this.arrow_ = button.querySelector("svg");
		/**
		* The rotation the arrow was last rendered with.
		* @type {number|undefined}
		* @private
		*/
		this.rotation_ = void 0;
		button.addEventListener("click", this.handleRotateNorth.bind(this), false);
	}
	handleRotateNorth() {
		this.getMap().getView().animate({
			rotation: 0,
			duration: 250
		});
	}
	/**
	* Keep the arrow pointing north, and hide the control when the map is
	* already rotated to north.
	* @param {import("../src/ol/MapEvent.js").default} mapEvent Map event.
	* @override
	*/
	render(mapEvent) {
		const frameState = mapEvent.frameState;
		if (!frameState) return;
		const rotation = frameState.viewState.rotation;
		if (rotation !== this.rotation_) {
			this.arrow_.style.transform = "rotate(" + rotation + "rad)";
			this.element.classList.toggle("ol-hidden", rotation === 0);
			this.rotation_ = rotation;
		}
	}
};
new Map({
	controls: defaults({ rotate: false }).extend([new RotateNorthControl()]),
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