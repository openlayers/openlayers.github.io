import { An as TileGrid, Ht as WebGLTileLayer, Mn as Map, Rt as GeoTIFFSource, or as View, yt as sourcesFromTileGrid } from "./common.js";
//#region examples/cog-pyramid.js
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ sources: sourcesFromTileGrid(new TileGrid({
		extent: [
			-180,
			-90,
			180,
			90
		],
		resolutions: [
			.703125,
			.3515625,
			.17578125,
			.087890625,
			.0439453125
		],
		tileSizes: [
			[512, 256],
			[1024, 512],
			[2048, 1024],
			[4096, 2048],
			[4096, 4096]
		]
	}), ([z, x, y]) => new GeoTIFFSource({ sources: [{ url: `https://cloudlessdownloads.eox.at/api/public/dl/jvu06wnt/STACTA-TileDirectory-2025-viewing-basic-epsg-4326-zoom-6-0/${z}/${y}/${x}.tif` }] })) })],
	view: new View({
		projection: "EPSG:4326",
		center: [0, 0],
		zoom: 0,
		showFullExtent: true
	})
});
//#endregion

//# sourceMappingURL=cog-pyramid.js.map