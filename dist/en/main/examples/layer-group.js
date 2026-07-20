import { Cn as OSM, Cr as fromLonLat, Mn as Map, Un as LayerGroup, jn as TileLayer, or as View, wt as TileJSON } from "./common.js";
//#region examples/layer-group.js
var map = new Map({
	layers: [new TileLayer({ source: new OSM() }), new LayerGroup({ layers: [new TileLayer({ source: new TileJSON({
		url: "https://api.tiles.mapbox.com/v4/mapbox.20110804-hoa-foodinsecurity-3month.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ",
		crossOrigin: "anonymous"
	}) }), new TileLayer({ source: new TileJSON({
		url: "https://api.tiles.mapbox.com/v4/mapbox.world-borders-light.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ",
		crossOrigin: "anonymous"
	}) })] })],
	target: "map",
	view: new View({
		center: fromLonLat([37.4057, 8.81566]),
		zoom: 4
	})
});
function bindInputs(layerid, layer) {
	const visibilityInput = document.querySelector(layerid + " input.visible");
	visibilityInput.addEventListener("change", function() {
		layer.setVisible(this.checked);
	});
	visibilityInput.addEventListener("change", function() {
		layer.setVisible(this.checked);
	});
	visibilityInput.checked = layer.getVisible();
	const opacityInput = document.querySelector(layerid + " input.opacity");
	opacityInput.addEventListener("input", function() {
		layer.setOpacity(parseFloat(this.value));
	});
	opacityInput.value = String(layer.getOpacity());
}
function setup(id, group) {
	group.getLayers().forEach(function(layer, i) {
		const layerid = id + i;
		bindInputs(layerid, layer);
		if (layer instanceof LayerGroup) setup(layerid, layer);
	});
}
setup("#layer", map.getLayerGroup());
document.querySelectorAll("#layertree li > span").forEach(function(element) {
	element.addEventListener("click", function() {
		this.parentNode.querySelector("fieldset").style.display = this.parentNode.querySelector("fieldset").style.display === "none" ? "" : "none";
	});
	element.parentNode.querySelector("fieldset").style.display = "none";
});
//#endregion

//# sourceMappingURL=layer-group.js.map