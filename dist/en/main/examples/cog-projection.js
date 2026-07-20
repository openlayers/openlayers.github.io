import { Bt as register, Ht as WebGLTileLayer, It as proj4, Mn as Map, Rt as GeoTIFFSource, wn as XYZ } from "./common.js";
//#region examples/cog-projection.js
var attributions = "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>";
register(proj4);
var cogSource = new GeoTIFFSource({
	sources: [{
		url: "https://mikenunn.net/data/MiniScale_(std_with_grid)_R23.tif",
		nodata: 0
	}],
	loadMissingProjection: true
});
cogSource.setAttributions("Contains OS data © Crown Copyright and database right " + (/* @__PURE__ */ new Date()).getFullYear());
new Map({
	target: "map",
	layers: [new WebGLTileLayer({
		source: new XYZ({
			attributions,
			url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
			tileSize: 512,
			maxZoom: 20,
			crossOrigin: ""
		}),
		style: { exposure: .2 }
	}), new WebGLTileLayer({
		source: cogSource,
		opacity: .7,
		style: { gamma: .7 }
	})],
	view: cogSource.getView()
});
//#endregion

//# sourceMappingURL=cog-projection.js.map