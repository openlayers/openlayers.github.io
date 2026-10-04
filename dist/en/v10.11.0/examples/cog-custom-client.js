import { Ht as WebGLTileLayer, Mn as Map, Rt as GeoTIFFSource, cr as withExtentCenter, lr as withHigherResolutions, sr as getView } from "./common.js";
//#region examples/cog-custom-client.js
var source = new GeoTIFFSource({ sources: [{
	url: "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif",
	loader: (url, headers, abortSignal) => {
		const customHeaders = { ...headers };
		return fetch(url, {
			headers: customHeaders,
			signal: abortSignal
		});
	}
}] });
new Map({
	target: "map",
	layers: [new WebGLTileLayer({ source })],
	view: getView(source, withHigherResolutions(1), withExtentCenter())
});
//#endregion

//# sourceMappingURL=cog-custom-client.js.map