import { Mn as Map, Tt as RasterSource, an as ImageTileSource, ft as select_default, gt as max, jn as TileLayer, or as View, un as ImageLayer, y as linear } from "./common.js";
//#region examples/raster.js
var minVgi = 0;
var maxVgi = .5;
var bins = 10;
/**
* Calculate the Vegetation Greenness Index (VGI) from an input pixel.  This
* is a rough estimate assuming that pixel values correspond to reflectance.
* @param {Array<number>} pixel An array of [R, G, B, A] values.
* @return {number} The VGI value for the given pixel.
*/
function vgi(pixel) {
	const r = pixel[0] / 255;
	const g = pixel[1] / 255;
	const b = pixel[2] / 255;
	return (2 * g - r - b) / (2 * g + r + b);
}
/**
* Summarize values for a histogram.
* @param {number} value A VGI value.
* @param {Object} counts An object for keeping track of VGI counts.
*/
function summarize(value, counts) {
	const min = counts.min;
	const max = counts.max;
	const num = counts.values.length;
	if (value < min) {} else if (value >= max) counts.values[num - 1] += 1;
	else {
		const index = Math.floor((value - min) / counts.delta);
		counts.values[index] += 1;
	}
}
var aerial = new ImageTileSource({
	attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
	url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
	tileSize: 512,
	maxZoom: 20,
	crossOrigin: ""
});
/**
* Create a raster source where pixels with VGI values above a threshold will
* be colored green.
*/
var raster = new RasterSource({
	sources: [aerial],
	/**
	* Run calculations on pixel data.
	* @param {Array} pixels List of pixels (one per source).
	* @param {Object} data User data object.
	* @return {Array} The output pixel.
	*/
	operation: function(pixels, data) {
		const pixel = pixels[0];
		const value = vgi(pixel);
		summarize(value, data.counts);
		if (value >= data.threshold) {
			pixel[0] = 0;
			pixel[1] = 255;
			pixel[2] = 0;
			pixel[3] = 128;
		} else pixel[3] = 0;
		return pixel;
	},
	lib: {
		vgi,
		summarize
	}
});
raster.set("threshold", .25);
function createCounts(min, max, num) {
	const values = new Array(num);
	for (let i = 0; i < num; ++i) values[i] = 0;
	return {
		min,
		max,
		values,
		delta: (max - min) / num
	};
}
raster.on("beforeoperations", function(event) {
	event.data.counts = createCounts(minVgi, maxVgi, bins);
	event.data.threshold = raster.get("threshold");
});
raster.on("afteroperations", function(event) {
	schedulePlot(event.resolution, event.data.counts, event.data.threshold);
});
new Map({
	layers: [new TileLayer({ source: aerial }), new ImageLayer({ source: raster })],
	target: "map",
	view: new View({
		center: [-9651695, 4937351],
		zoom: 13,
		minZoom: 12,
		maxZoom: 19
	})
});
var timer = null;
function schedulePlot(resolution, counts, threshold) {
	if (timer) {
		clearTimeout(timer);
		timer = null;
	}
	timer = setTimeout(plot.bind(null, resolution, counts, threshold), 1e3 / 60);
}
var barWidth = 15;
var plotHeight = 150;
var chart = select_default("#plot").append("svg").attr("width", barWidth * bins).attr("height", plotHeight);
var chartRect = chart.node().getBoundingClientRect();
var tip = select_default(document.body).append("div").attr("class", "tip");
function plot(resolution, counts, threshold) {
	const yScale = linear().domain([0, max(counts.values)]).range([0, plotHeight]);
	const bar = chart.selectAll("rect").data(counts.values);
	bar.enter().append("rect");
	bar.attr("class", function(count, index) {
		return "bar" + (counts.min + index * counts.delta >= threshold ? " selected" : "");
	}).attr("width", barWidth - 2);
	bar.transition().attr("transform", function(value, index) {
		return "translate(" + index * barWidth + ", " + (plotHeight - yScale(value)) + ")";
	}).attr("height", yScale);
	bar.on("mousemove", function() {
		const index = bar.nodes().indexOf(this);
		const threshold = counts.min + index * counts.delta;
		if (raster.get("threshold") !== threshold) {
			raster.set("threshold", threshold);
			raster.changed();
		}
	});
	bar.on("mouseover", function(event) {
		const index = bar.nodes().indexOf(this);
		let area = 0;
		for (let i = counts.values.length - 1; i >= index; --i) area += resolution * resolution * counts.values[i];
		tip.html(message(counts.min + index * counts.delta, area));
		tip.style("display", "block");
		tip.transition().style("left", chartRect.left + index * barWidth + barWidth / 2 + "px").style("top", event.y - 60 + "px").style("opacity", 1);
	});
	bar.on("mouseout", function() {
		tip.transition().style("opacity", 0).on("end", function() {
			tip.style("display", "none");
		});
	});
}
function message(value, area) {
	return (area / 4046.86).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " acres at<br>" + value.toFixed(2) + " VGI or above";
}
//#endregion

//# sourceMappingURL=raster.js.map