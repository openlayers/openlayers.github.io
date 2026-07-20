import { Bt as register, Cn as OSM, Cr as fromLonLat, It as proj4, Mn as Map, U as ScaleLine, jn as TileLayer, kr as transformExtent, or as View } from "./common.js";
//#region examples/scaleline-indiana-east.js
proj4.defs("Indiana-East", "PROJCS[\"IN83-EF\",GEOGCS[\"LL83\",DATUM[\"NAD83\",SPHEROID[\"GRS1980\",6378137.000,298.25722210]],PRIMEM[\"Greenwich\",0],UNIT[\"Degree\",0.017453292519943295]],PROJECTION[\"Transverse_Mercator\"],PARAMETER[\"false_easting\",328083.333],PARAMETER[\"false_northing\",820208.333],PARAMETER[\"scale_factor\",0.999966666667],PARAMETER[\"central_meridian\",-85.66666666666670],PARAMETER[\"latitude_of_origin\",37.50000000000000],UNIT[\"Foot_US\",0.30480060960122]]");
register(proj4);
new Map({
	layers: [new TileLayer({ source: new OSM() })],
	target: "map",
	view: new View({
		projection: "Indiana-East",
		center: fromLonLat([-85.685, 39.891], "Indiana-East"),
		zoom: 7,
		extent: transformExtent([
			-172.54,
			23.81,
			-47.74,
			86.46
		], "EPSG:4326", "Indiana-East"),
		minZoom: 6
	})
}).addControl(new ScaleLine({ units: "us" }));
//#endregion

//# sourceMappingURL=scaleline-indiana-east.js.map