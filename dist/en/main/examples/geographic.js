import { Ar as useGeographic, Cn as OSM, Mn as Map, at as Overlay, bn as VectorLayer, dn as VectorSource, hr as Point, jn as TileLayer, or as View, xn as Feature } from "./common.js";
//#region examples/geographic.js
useGeographic();
var place = [-110, 45];
var point = new Point(place);
var map = new Map({
	target: "map",
	view: new View({
		center: place,
		zoom: 8
	}),
	layers: [new TileLayer({ source: new OSM() }), new VectorLayer({
		source: new VectorSource({ features: [new Feature(point)] }),
		style: {
			"circle-radius": 9,
			"circle-fill-color": "red"
		}
	})]
});
var element = document.getElementById("popup");
var popup = new Overlay({
	element,
	stopEvent: false
});
map.addOverlay(popup);
function formatCoordinate(coordinate) {
	return `
    <table>
      <tbody>
        <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
        <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
      </tbody>
    </table>`;
}
var info = document.getElementById("info");
map.on("moveend", function() {
	info.innerHTML = formatCoordinate(map.getView().getCenter());
});
var popover;
map.on("click", function(event) {
	if (popover) {
		popover.dispose();
		popover = void 0;
	}
	const feature = map.getFeaturesAtPixel(event.pixel)[0];
	if (!feature) return;
	const coordinate = feature.getGeometry().getCoordinates();
	popup.setPosition([coordinate[0] + Math.round(event.coordinate[0] / 360) * 360, coordinate[1]]);
	popover = new bootstrap.Popover(element, {
		container: element.parentElement,
		content: formatCoordinate(coordinate),
		html: true,
		offset: [0, 20],
		placement: "top",
		sanitize: false
	});
	popover.show();
});
map.on("pointermove", function(event) {
	const type = map.hasFeatureAtPixel(event.pixel) ? "pointer" : "inherit";
	map.getViewport().style.cursor = type;
});
//#endregion

//# sourceMappingURL=geographic.js.map