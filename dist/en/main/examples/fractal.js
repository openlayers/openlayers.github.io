import { Mn as Map, bn as VectorLayer, dn as VectorSource, gn as LineString, or as View, xn as Feature } from "./common.js";
//#region examples/fractal.js
var radius = 1e7;
var cos30 = Math.cos(Math.PI / 6);
var rise = radius * Math.sin(Math.PI / 6);
var run = radius * cos30;
var triangle = new LineString([
	[0, radius],
	[run, -rise],
	[-run, -rise],
	[0, radius]
]);
var feature = new Feature(triangle);
new Map({
	layers: [new VectorLayer({ source: new VectorSource({ features: [feature] }) })],
	target: "map",
	view: new View({
		center: [0, 0],
		zoom: 1
	})
});
function makeFractal(depth) {
	const geometry = triangle.clone();
	const graph = coordsToGraph(geometry.getCoordinates());
	for (let i = 0; i < depth; ++i) {
		let node = graph;
		while (node.next) {
			const next = node.next;
			injectNodes(node);
			node = next;
		}
	}
	const coordinates = graphToCoords(graph);
	document.getElementById("count").innerText = String(coordinates.length);
	geometry.setCoordinates(coordinates);
	feature.setGeometry(geometry);
}
function injectNodes(startNode) {
	const endNode = startNode.next;
	const start = startNode.point;
	const end = startNode.next.point;
	const dx = end[0] - start[0];
	const dy = end[1] - start[1];
	const firstNode = { point: [start[0] + dx / 3, start[1] + dy / 3] };
	const r = Math.sqrt(dx * dx + dy * dy) / (2 * cos30);
	const a = Math.atan2(dy, dx) + Math.PI / 6;
	const secondNode = { point: [start[0] + r * Math.cos(a), start[1] + r * Math.sin(a)] };
	const thirdNode = { point: [end[0] - dx / 3, end[1] - dy / 3] };
	startNode.next = firstNode;
	firstNode.next = secondNode;
	secondNode.next = thirdNode;
	thirdNode.next = endNode;
}
function coordsToGraph(coordinates) {
	const graph = { point: coordinates[0] };
	const length = coordinates.length;
	for (let level = 0, node = graph; level < length - 1; ++level) {
		node.next = { point: coordinates[level + 1] };
		node = node.next;
	}
	return graph;
}
function graphToCoords(graph) {
	const coordinates = [graph.point];
	for (let node = graph, i = 1; node.next; node = node.next, ++i) coordinates[i] = node.next.point;
	return coordinates;
}
var depthInput = document.getElementById("depth");
function update() {
	makeFractal(Number(depthInput.value));
}
var updateTimer;
/**
* Regenerate fractal on depth change.  Change events are debounced so updates
* only occur every 200ms.
*/
depthInput.onchange = function() {
	window.clearTimeout(updateTimer);
	updateTimer = window.setTimeout(update, 200);
};
update();
//#endregion

//# sourceMappingURL=fractal.js.map