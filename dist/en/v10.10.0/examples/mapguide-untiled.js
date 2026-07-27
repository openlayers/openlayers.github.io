import { Mn as Map, jt as ImageMapGuide, or as View, un as ImageLayer } from "./common.js";
//#region examples/mapguide-untiled.js
new Map({
	layers: [new ImageLayer({
		extent: [
			-87.86511444236592,
			43.66506556483793,
			-87.59539405949707,
			43.82385256443007
		],
		source: new ImageMapGuide({
			projection: "EPSG:4326",
			url: "https://mikenunn.net/mapguide/mapagent/mapagent.fcgi?",
			useOverlay: false,
			metersPerUnit: 111319.4908,
			params: {
				MAPDEFINITION: "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition",
				FORMAT: "PNG",
				VERSION: "3.0.0",
				USERNAME: "OLGuest",
				PASSWORD: "olguest"
			},
			ratio: 2
		})
	})],
	target: "map",
	view: new View({
		center: [-87.7302542509315, 43.744459064634],
		projection: "EPSG:4326",
		zoom: 12
	})
});
//#endregion

//# sourceMappingURL=mapguide-untiled.js.map