import { L as FullScreen, nt as apply } from "./common.js";
//#region examples/mapbox-style.js
apply("map", "https://api.maptiler.com/maps/outdoor-v2/style.json?key=get_your_own_D6rA4zTHduk6KOKTXzGB").then(function(map) {
	map.addControl(new FullScreen());
});
//#endregion

//# sourceMappingURL=mapbox-style.js.map