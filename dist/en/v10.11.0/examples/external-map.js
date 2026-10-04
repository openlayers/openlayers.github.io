import { Cn as OSM, Cr as fromLonLat, L as FullScreen, Mn as Map, ar as Control, jn as TileLayer, or as View, rr as defaults } from "./common.js";
//#region examples/external-map.js
var UnusableMask = class extends Control {
	constructor() {
		super({ element: document.createElement("div") });
		this.element.setAttribute("hidden", "hidden");
		this.element.className = "ol-mask";
		this.element.innerHTML = "<div>Map not usable</div>";
	}
};
var localMapTarget = document.getElementById("map");
var map = new Map({
	target: localMapTarget,
	controls: defaults().extend([new FullScreen(), new UnusableMask()]),
	layers: [new TileLayer({ source: new OSM() })],
	view: new View({
		center: fromLonLat([37.41, 8.82]),
		zoom: 4
	})
});
var mapWindow;
function closeMapWindow() {
	if (mapWindow) {
		mapWindow.close();
		mapWindow = void 0;
	}
}
window.addEventListener("pagehide", closeMapWindow);
var button = document.getElementById("external-map-button");
function resetMapTarget() {
	localMapTarget.style.height = "";
	map.setTarget(localMapTarget);
	button.disabled = false;
}
function updateOverlay() {
	if (!mapWindow) return;
	const externalMapTarget = mapWindow.document.getElementById("map");
	if (!externalMapTarget) return;
	if (document.visibilityState === "visible") {
		externalMapTarget.classList.remove("unusable");
		externalMapTarget.setAttribute("tabindex", "0");
		externalMapTarget.focus();
	} else {
		externalMapTarget.removeAttribute("tabindex");
		externalMapTarget.classList.add("unusable");
	}
}
window.addEventListener("visibilitychange", updateOverlay);
button.addEventListener("click", function() {
	const blockerNotice = document.getElementById("blocker-notice");
	blockerNotice.setAttribute("hidden", "hidden");
	button.disabled = true;
	let timeoutKey = setTimeout(function() {
		closeMapWindow();
		resetMapTarget();
		blockerNotice.removeAttribute("hidden");
		timeoutKey = void 0;
	}, 3e3);
	mapWindow = window.open("resources/external-map-map.html", "MapWindow", "toolbar=0,location=0,menubar=0,width=800,height=600");
	mapWindow.addEventListener("DOMContentLoaded", function() {
		const externalMapTarget = mapWindow.document.getElementById("map");
		localMapTarget.style.height = "0px";
		map.setTarget(externalMapTarget);
		if (timeoutKey) {
			clearTimeout(timeoutKey);
			timeoutKey = void 0;
		}
		mapWindow.addEventListener("pagehide", function() {
			resetMapTarget();
			closeMapWindow();
		});
		updateOverlay();
	});
});
//#endregion

//# sourceMappingURL=external-map.js.map