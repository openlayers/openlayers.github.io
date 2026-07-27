import { Cn as OSM, Gt as Draw, Kt as createBox, Mn as Map, bn as VectorLayer, dn as VectorSource, fr as Polygon, jn as TileLayer, or as View, qt as createRegularPolygon } from "./common.js";
//#region examples/draw-shapes.js
var raster = new TileLayer({ source: new OSM() });
var source = new VectorSource({ wrapX: false });
var map = new Map({
	layers: [raster, new VectorLayer({ source })],
	target: "map",
	view: new View({
		center: [-11e6, 46e5],
		zoom: 4
	})
});
var typeSelect = document.getElementById("type");
var draw;
function addInteraction() {
	let value = typeSelect.value;
	if (value !== "None") {
		let geometryFunction;
		if (value === "Square") {
			value = "Circle";
			geometryFunction = createRegularPolygon(4);
		} else if (value === "Box") {
			value = "Circle";
			geometryFunction = createBox();
		} else if (value === "Star") {
			value = "Circle";
			geometryFunction = function(coordinates, geometry) {
				const center = coordinates[0];
				const last = coordinates[coordinates.length - 1];
				const dx = center[0] - last[0];
				const dy = center[1] - last[1];
				const radius = Math.sqrt(dx * dx + dy * dy);
				const rotation = Math.atan2(dy, dx);
				const newCoordinates = [];
				const numPoints = 12;
				for (let i = 0; i < numPoints; ++i) {
					const angle = rotation + i * 2 * Math.PI / numPoints;
					const fraction = i % 2 === 0 ? 1 : .5;
					const offsetX = radius * fraction * Math.cos(angle);
					const offsetY = radius * fraction * Math.sin(angle);
					newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
				}
				newCoordinates.push(newCoordinates[0].slice());
				if (!geometry) geometry = new Polygon([newCoordinates]);
				else geometry.setCoordinates([newCoordinates]);
				return geometry;
			};
		}
		draw = new Draw({
			source,
			type: value,
			geometryFunction
		});
		map.addInteraction(draw);
	}
}
/**
* Handle change event.
*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	addInteraction();
};
document.getElementById("undo").addEventListener("click", function() {
	draw.removeLastPoint();
});
addInteraction();
//#endregion

//# sourceMappingURL=draw-shapes.js.map