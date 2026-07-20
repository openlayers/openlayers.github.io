import { Cr as fromLonLat, Dr as toLonLat, Gr as getCenter, Hn as Layer, Mn as Map, Yr as getWidth, _t as json_default, dt as feature_default, ft as select_default, ht as bounds_default, jn as TileLayer, mt as path_default, or as View, pt as mercator_default, yn as StadiaMaps } from "./common.js";
//#region examples/d3.js
var CanvasLayer = class extends Layer {
	constructor(options) {
		super(options);
		this.features = options.features;
		this.svg = select_default(document.createElement("div")).append("svg").style("position", "absolute");
		this.svg.append("path").datum(this.features).attr("class", "boundary");
	}
	getSourceState() {
		return "ready";
	}
	render(frameState) {
		const width = frameState.size[0];
		const height = frameState.size[1];
		const projection = frameState.viewState.projection;
		const d3Projection = mercator_default().scale(1).translate([0, 0]);
		let d3Path = path_default().projection(d3Projection);
		const pixelBounds = d3Path.bounds(this.features);
		const pixelBoundsWidth = pixelBounds[1][0] - pixelBounds[0][0];
		const pixelBoundsHeight = pixelBounds[1][1] - pixelBounds[0][1];
		const bounds = bounds_default(this.features);
		const geoBoundsLeftBottom = fromLonLat(bounds[0], projection);
		const geoBoundsRightTop = fromLonLat(bounds[1], projection);
		let geoBoundsWidth = geoBoundsRightTop[0] - geoBoundsLeftBottom[0];
		if (geoBoundsWidth < 0) geoBoundsWidth += getWidth(projection.getExtent());
		const geoBoundsHeight = geoBoundsRightTop[1] - geoBoundsLeftBottom[1];
		const widthResolution = geoBoundsWidth / pixelBoundsWidth;
		const heightResolution = geoBoundsHeight / pixelBoundsHeight;
		const scale = Math.max(widthResolution, heightResolution) / frameState.viewState.resolution;
		const center = toLonLat(getCenter(frameState.extent), projection);
		const angle = -frameState.viewState.rotation * 180 / Math.PI;
		d3Projection.scale(scale).center(center).translate([width / 2, height / 2]).angle(angle);
		d3Path = d3Path.projection(d3Projection);
		d3Path(this.features);
		this.svg.attr("width", width);
		this.svg.attr("height", height);
		this.svg.select("path").attr("d", d3Path);
		return this.svg.node();
	}
};
var map = new Map({
	layers: [new TileLayer({ source: new StadiaMaps({ layer: "stamen_watercolor" }) })],
	target: "map",
	view: new View({
		center: fromLonLat([-97, 38]),
		zoom: 4
	})
});
/**
* Load the topojson data and create an ol/layer/Layer for that data.
*/
json_default("data/topojson/us.json").then(function(us) {
	const layer = new CanvasLayer({ features: feature_default(us, "counties") });
	map.addLayer(layer);
});
//#endregion

//# sourceMappingURL=d3.js.map