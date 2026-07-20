import { Ct as TileWMS, Gr as getCenter, Mn as Map, jn as TileLayer, kr as transformExtent, or as View, yn as StadiaMaps } from "./common.js";
//#region examples/wms-time.js
var interval = 10800 * 1e3;
var step = 900 * 1e3;
var frameRate = .5;
var extent = transformExtent([
	-126,
	24,
	-66,
	50
], "EPSG:4326", "EPSG:3857");
var wmsTime = /* @__PURE__ */ new Date();
var animationId = null;
var stadiaLayer = new TileLayer({ source: new StadiaMaps({ layer: "stamen_terrain" }) });
var tileWmsLayer = new TileLayer({
	extent,
	source: new TileWMS({
		attributions: ["Iowa State University"],
		url: "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi",
		params: { "LAYERS": "nexrad-n0r-wmst" }
	})
});
new Map({
	layers: [stadiaLayer, tileWmsLayer],
	target: "map",
	view: new View({
		center: getCenter(extent),
		zoom: 4
	})
});
var el = document.getElementById("info");
function updateInfo(time) {
	el.innerHTML = time.toISOString();
}
function threeHoursAgo() {
	return /* @__PURE__ */ new Date(Math.floor((Date.now() - interval) / step) * step);
}
function setTime() {
	wmsTime.setMinutes(wmsTime.getMinutes() + 15);
	if (wmsTime.getTime() > Date.now()) wmsTime = threeHoursAgo();
	tileWmsLayer.getSource().updateParams({ "TIME": wmsTime.toISOString() });
	updateInfo(wmsTime);
}
setTime();
var stop = function() {
	if (animationId !== null) {
		window.clearInterval(animationId);
		animationId = null;
	}
};
var play = function() {
	stop();
	animationId = window.setInterval(setTime, 1e3 / frameRate);
};
document.getElementById("play").addEventListener("click", play, false);
document.getElementById("pause").addEventListener("click", stop, false);
//#endregion

//# sourceMappingURL=wms-time.js.map