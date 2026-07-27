import { Bt as register, Cn as OSM, Ht as WebGLTileLayer, It as proj4, Mn as Map, Qt as TileDebug, Rt as GeoTIFFSource, kr as transformExtent, or as View, zt as fromProjectionCode } from "./common.js";
//#region examples/cog-modeltransformation.js
register(proj4);
var cogSource = new GeoTIFFSource({ sources: [{ url: "https://umbra-open-data-catalog.s3.amazonaws.com/sar-data/tasks/Tanna%20Island,%20Vanuatu/9c76a918-9247-42bf-b9f6-3b4f672bc148/2023-02-12-21-33-56_UMBRA-04/2023-02-12-21-33-56_UMBRA-04_GEC.tif" }] });
var showTilesCheckbox = document.getElementById("show-tiles");
var debugLayer = new WebGLTileLayer({
	source: new TileDebug({ source: cogSource }),
	visible: showTilesCheckbox.checked
});
showTilesCheckbox.addEventListener("change", () => {
	debugLayer.setVisible(showTilesCheckbox.checked);
});
var map = new Map({
	target: "map",
	layers: [
		new WebGLTileLayer({ source: new OSM() }),
		new WebGLTileLayer({
			source: cogSource,
			opacity: .8
		}),
		debugLayer
	],
	view: new View()
});
cogSource.getView().then((viewConfig) => fromProjectionCode(viewConfig.projection.getCode()).then(() => {
	const view = map.getView();
	view.fit(transformExtent(viewConfig.extent, viewConfig.projection, view.getProjection()));
}));
//#endregion

//# sourceMappingURL=cog-modeltransformation.js.map