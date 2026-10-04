import { j as WMSGetFeatureInfo } from "./common.js";
//#region examples/getfeatureinfo-layers.js
fetch("data/wmsgetfeatureinfo/osm-restaurant-hotel.xml").then(function(response) {
	return response.text();
}).then(function(response) {
	const allFeatures = new WMSGetFeatureInfo().readFeatures(response);
	document.getElementById("all").innerText = allFeatures.length.toString();
	const hotelFeatures = new WMSGetFeatureInfo({ layers: ["hotel"] }).readFeatures(response);
	document.getElementById("hotel").innerText = hotelFeatures.length.toString();
	const restaurantFeatures = new WMSGetFeatureInfo({ layers: ["restaurant"] }).readFeatures(response);
	document.getElementById("restaurant").innerText = restaurantFeatures.length.toString();
});
//#endregion

//# sourceMappingURL=getfeatureinfo-layers.js.map