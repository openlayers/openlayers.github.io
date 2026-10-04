import { Cn as OSM, Cr as fromLonLat, Fr as easeIn, Ir as easeOut, Mn as Map, jn as TileLayer, or as View } from "./common.js";
//#region examples/animation.js
var london = fromLonLat([-.12755, 51.507222]);
var moscow = fromLonLat([37.6178, 55.7517]);
var istanbul = fromLonLat([28.9744, 41.0128]);
var rome = fromLonLat([12.5, 41.9]);
var bern = fromLonLat([7.4458, 46.95]);
var view = new View({
	center: istanbul,
	zoom: 6
});
new Map({
	target: "map",
	layers: [new TileLayer({
		preload: 4,
		source: new OSM()
	})],
	view
});
function bounce(t) {
	const s = 7.5625;
	const p = 2.75;
	let l;
	if (t < 1 / p) l = s * t * t;
	else if (t < 2 / p) {
		t -= 1.5 / p;
		l = s * t * t + .75;
	} else if (t < 2.5 / p) {
		t -= 2.25 / p;
		l = s * t * t + .9375;
	} else {
		t -= 2.625 / p;
		l = s * t * t + .984375;
	}
	return l;
}
function elastic(t) {
	return Math.pow(2, -10 * t) * Math.sin((t - .075) * (2 * Math.PI) / .3) + 1;
}
function onClick(id, callback) {
	document.getElementById(id).addEventListener("click", callback);
}
onClick("rotate-left", function() {
	view.animate({ rotation: view.getRotation() + Math.PI / 2 });
});
onClick("rotate-right", function() {
	view.animate({ rotation: view.getRotation() - Math.PI / 2 });
});
onClick("rotate-around-rome", function() {
	const rotation = view.getRotation();
	view.animate({
		rotation: rotation + Math.PI,
		anchor: rome,
		easing: easeIn
	}, {
		rotation: rotation + 2 * Math.PI,
		anchor: rome,
		easing: easeOut
	});
});
onClick("pan-to-london", function() {
	view.animate({
		center: london,
		duration: 2e3
	});
});
onClick("elastic-to-moscow", function() {
	view.animate({
		center: moscow,
		duration: 2e3,
		easing: elastic
	});
});
onClick("bounce-to-istanbul", function() {
	view.animate({
		center: istanbul,
		duration: 2e3,
		easing: bounce
	});
});
onClick("spin-to-rome", function() {
	const center = view.getCenter();
	view.animate({
		center: [center[0] + (rome[0] - center[0]) / 2, center[1] + (rome[1] - center[1]) / 2],
		rotation: Math.PI,
		easing: easeIn
	}, {
		center: rome,
		rotation: 2 * Math.PI,
		easing: easeOut
	});
});
function flyTo(location, done) {
	const duration = 2e3;
	const zoom = view.getZoom();
	let parts = 2;
	let called = false;
	function callback(complete) {
		--parts;
		if (called) return;
		if (parts === 0 || !complete) {
			called = true;
			done(complete);
		}
	}
	view.animate({
		center: location,
		duration
	}, callback);
	view.animate({
		zoom: zoom - 1,
		duration: duration / 2
	}, {
		zoom,
		duration: duration / 2
	}, callback);
}
onClick("fly-to-bern", function() {
	flyTo(bern, function() {});
});
function tour() {
	const locations = [
		london,
		bern,
		rome,
		moscow,
		istanbul
	];
	let index = -1;
	function next(more) {
		if (more) {
			++index;
			if (index < locations.length) setTimeout(function() {
				flyTo(locations[index], next);
			}, index === 0 ? 0 : 750);
			else alert("Tour complete");
		} else alert("Tour cancelled");
	}
	next(true);
}
onClick("tour", tour);
//#endregion

//# sourceMappingURL=animation.js.map