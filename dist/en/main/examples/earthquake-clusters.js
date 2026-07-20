import { Fn as Stroke, Hr as createEmpty, Kr as getHeight, Ln as Fill, Mn as Map, Nn as Text, Pn as Style, Rn as CircleStyle, Ur as extend, Wn as defaults, Wt as Cluster, Yr as getWidth, bn as VectorLayer, dn as VectorSource, jn as TileLayer, nn as Select, or as View, tn as KML, yn as StadiaMaps, zn as RegularShape } from "./common.js";
//#region examples/earthquake-clusters.js
var earthquakeFill = new Fill({ color: "rgba(255, 153, 0, 0.8)" });
var earthquakeStroke = new Stroke({
	color: "rgba(255, 204, 0, 0.2)",
	width: 1
});
var textFill = new Fill({ color: "#fff" });
var textStroke = new Stroke({
	color: "rgba(0, 0, 0, 0.6)",
	width: 3
});
var invisibleFill = new Fill({ color: "rgba(255, 255, 255, 0.01)" });
function createEarthquakeStyle(feature) {
	const name = feature.get("name");
	const radius = 5 + 20 * (parseFloat(name.substr(2)) - 5);
	return new Style({
		geometry: feature.getGeometry(),
		image: new RegularShape({
			radius,
			radius2: 3,
			points: 5,
			angle: Math.PI,
			fill: earthquakeFill,
			stroke: earthquakeStroke
		})
	});
}
var maxFeatureCount;
var vector = null;
var calculateClusterInfo = function(resolution) {
	maxFeatureCount = 0;
	const features = vector.getSource().getFeatures();
	let feature, radius;
	for (let i = features.length - 1; i >= 0; --i) {
		feature = features[i];
		const originalFeatures = feature.get("features");
		const extent = createEmpty();
		let j, jj;
		for (j = 0, jj = originalFeatures.length; j < jj; ++j) extend(extent, originalFeatures[j].getGeometry().getExtent());
		maxFeatureCount = Math.max(maxFeatureCount, jj);
		radius = .25 * (getWidth(extent) + getHeight(extent)) / resolution;
		feature.set("radius", radius);
	}
};
var currentResolution;
function styleFunction(feature, resolution) {
	if (resolution != currentResolution) {
		calculateClusterInfo(resolution);
		currentResolution = resolution;
	}
	let style;
	const size = feature.get("features").length;
	if (size > 1) style = new Style({
		image: new CircleStyle({
			radius: feature.get("radius"),
			fill: new Fill({ color: [
				255,
				153,
				0,
				Math.min(.8, .4 + size / maxFeatureCount)
			] })
		}),
		text: new Text({
			text: size.toString(),
			fill: textFill,
			stroke: textStroke
		})
	});
	else {
		const originalFeature = feature.get("features")[0];
		style = createEarthquakeStyle(originalFeature);
	}
	return style;
}
function selectStyleFunction(feature) {
	const styles = [new Style({ image: new CircleStyle({
		radius: feature.get("radius"),
		fill: invisibleFill
	}) })];
	const originalFeatures = feature.get("features");
	let originalFeature;
	for (let i = originalFeatures.length - 1; i >= 0; --i) {
		originalFeature = originalFeatures[i];
		styles.push(createEarthquakeStyle(originalFeature));
	}
	return styles;
}
vector = new VectorLayer({
	source: new Cluster({
		distance: 40,
		source: new VectorSource({
			url: "data/kml/2012_Earthquakes_Mag5.kml",
			format: new KML({ extractStyles: false })
		})
	}),
	style: styleFunction
});
new Map({
	layers: [new TileLayer({ source: new StadiaMaps({ layer: "stamen_toner" }) }), vector],
	interactions: defaults().extend([new Select({
		condition: function(evt) {
			return evt.type == "pointermove" || evt.type == "singleclick";
		},
		style: selectStyleFunction
	})]),
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 2
	})
});
//#endregion

//# sourceMappingURL=earthquake-clusters.js.map