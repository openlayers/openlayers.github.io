import { At as Static, Gr as getCenter, Mn as Map, jr as Projection, or as View, un as ImageLayer } from "./common.js";
//#region examples/static-image.js
var extent = [
	0,
	0,
	1024,
	968
];
var projection = new Projection({
	code: "xkcd-image",
	units: "pixels",
	extent
});
new Map({
	layers: [new ImageLayer({ source: new Static({
		attributions: "© <a href=\"https://xkcd.com/license.html\">xkcd</a>",
		url: "https://imgs.xkcd.com/comics/online_communities.png",
		projection,
		imageExtent: extent
	}) })],
	target: "map",
	view: new View({
		projection,
		center: getCenter(extent),
		zoom: 2,
		maxZoom: 8
	})
});
//#endregion

//# sourceMappingURL=static-image.js.map