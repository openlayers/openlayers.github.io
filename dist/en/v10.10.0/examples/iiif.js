import { Mn as Map, Mt as IIIF, Pt as IIIFInfo, jn as TileLayer, or as View } from "./common.js";
//#region examples/iiif.js
var layer = new TileLayer();
var map = new Map({
	layers: [layer],
	target: "map"
});
var notifyDiv = document.getElementById("iiif-notification");
var urlInput = document.getElementById("imageInfoUrl");
var displayButton = document.getElementById("display");
function refreshMap(imageInfoUrl) {
	fetch(imageInfoUrl).then(function(response) {
		response.json().then(function(imageInfo) {
			const options = new IIIFInfo(imageInfo).getTileSourceOptions();
			if (options === void 0 || options.version === void 0) {
				notifyDiv.textContent = "Data seems to be no valid IIIF image information.";
				return;
			}
			options.zDirection = -1;
			const iiifTileSource = new IIIF(options);
			layer.setSource(iiifTileSource);
			map.setView(new View({
				resolutions: iiifTileSource.getTileGrid().getResolutions(),
				extent: iiifTileSource.getTileGrid().getExtent(),
				constrainOnlyCenter: true
			}));
			map.getView().fit(iiifTileSource.getTileGrid().getExtent());
			notifyDiv.textContent = "";
		}).catch(function(body) {
			notifyDiv.textContent = "Could not read image info json. " + body;
		});
	}).catch(function() {
		notifyDiv.textContent = "Could not read data from URL.";
	});
}
displayButton.addEventListener("click", function() {
	refreshMap(urlInput.value);
});
refreshMap(urlInput.value);
//#endregion

//# sourceMappingURL=iiif.js.map