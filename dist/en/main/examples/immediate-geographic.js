import { Ar as useGeographic, Ln as Fill, Lr as upAndDown, Mn as Map, Pn as Style, Rn as CircleStyle, ct as getVectorContext, hr as Point, jn as TileLayer, or as View, yn as StadiaMaps } from "./common.js";
//#region examples/immediate-geographic.js
useGeographic();
var layer = new TileLayer({ source: new StadiaMaps({ layer: "stamen_toner" }) });
var map = new Map({
	layers: [layer],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
var image = new CircleStyle({
	radius: 8,
	fill: new Fill({ color: "rgb(255, 153, 0)" })
});
var style = new Style({ image });
var n = 1e3;
var geometries = new Array(n);
for (let i = 0; i < n; ++i) geometries[i] = new Point([360 * Math.random() - 180, 180 * Math.random() - 90]);
layer.on("postrender", function(event) {
	const vectorContext = getVectorContext(event);
	for (let i = 0; i < n; ++i) {
		const importance = upAndDown(Math.pow((n - i) / n, .15));
		if (importance < .1) continue;
		image.setOpacity(importance);
		image.setScale(importance);
		vectorContext.setStyle(style);
		vectorContext.drawGeometry(geometries[i]);
	}
	const lon = 360 * Math.random() - 180;
	const lat = 180 * Math.random() - 90;
	geometries.push(new Point([lon, lat]));
	geometries.shift();
	map.render();
});
//#endregion

//# sourceMappingURL=immediate-geographic.js.map