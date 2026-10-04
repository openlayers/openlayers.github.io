import { Cn as OSM, Mn as Map, jn as TileLayer, or as View, z as ZoomSlider } from "./common.js";
//#region examples/zoomslider.js
/**
* Helper method for map-creation.
*
* @param {string} divId The id of the div for the map.
* @return {Map} The map instance.
*/
function createMap(divId) {
	const map = new Map({
		layers: [new TileLayer({ source: new OSM() })],
		target: divId,
		view: new View({
			center: [0, 0],
			zoom: 2
		})
	});
	const zoomslider = new ZoomSlider();
	map.addControl(zoomslider);
	return map;
}
createMap("map1");
createMap("map2");
createMap("map3");
//#endregion

//# sourceMappingURL=zoomslider.js.map