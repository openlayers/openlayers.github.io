import { Mn as Map, an as ImageTileSource, jn as TileLayer, or as View } from "./common.js";
//#region examples/tile-load-events.js
/**
* Renders a progress bar.
* @param {HTMLElement} el The target element.
* @class
*/
function Progress(el) {
	this.el = el;
	this.loading = 0;
	this.loaded = 0;
}
/**
* Increment the count of loading tiles.
*/
Progress.prototype.addLoading = function() {
	++this.loading;
	this.update();
};
/**
* Increment the count of loaded tiles.
*/
Progress.prototype.addLoaded = function() {
	++this.loaded;
	this.update();
};
/**
* Update the progress bar.
*/
Progress.prototype.update = function() {
	const width = (this.loaded / this.loading * 100).toFixed(1) + "%";
	this.el.style.width = width;
};
/**
* Show the progress bar.
*/
Progress.prototype.show = function() {
	this.el.style.visibility = "visible";
};
/**
* Hide the progress bar.
*/
Progress.prototype.hide = function() {
	const style = this.el.style;
	setTimeout(function() {
		style.visibility = "hidden";
		style.width = "0px";
	}, 250);
};
var progress = new Progress(document.getElementById("progress"));
var source = new ImageTileSource({
	attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
	url: "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	tileSize: 512
});
source.on("tileloadstart", function() {
	progress.addLoading();
});
source.on(["tileloadend", "tileloaderror"], function() {
	progress.addLoaded();
});
var map = new Map({
	layers: [new TileLayer({ source })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
map.on("loadstart", function() {
	progress.show();
});
map.on("loadend", function() {
	progress.hide();
});
//#endregion

//# sourceMappingURL=tile-load-events.js.map