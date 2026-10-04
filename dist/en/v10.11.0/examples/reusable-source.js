import { Ht as WebGLTileLayer, Mn as Map, an as ImageTileSource, or as View } from "./common.js";
//#region examples/reusable-source.js
var urls = [
	"https://{a-c}.tiles.mapbox.com/v4/mapbox.blue-marble-topo-jan/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ",
	"https://{a-c}.tiles.mapbox.com/v4/mapbox.blue-marble-topo-bathy-jan/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ",
	"https://{a-c}.tiles.mapbox.com/v4/mapbox.blue-marble-topo-jul/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ",
	"https://{a-c}.tiles.mapbox.com/v4/mapbox.blue-marble-topo-bathy-jul/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2t0cGdwMHVnMGdlbzMxbDhwazBic2xrNSJ9.WbcTL9uj8JPAsnT9mgb7oQ"
];
var source = new ImageTileSource();
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source })],
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
function updateUrl(index) {
	source.setUrl(urls[index]);
}
var buttons = document.getElementsByClassName("switcher");
for (let i = 0, ii = buttons.length; i < ii; ++i) {
	const button = buttons[i];
	button.addEventListener("click", updateUrl.bind(null, Number(button.value)));
}
updateUrl(0);
//#endregion

//# sourceMappingURL=reusable-source.js.map