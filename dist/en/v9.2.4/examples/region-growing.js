"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[6663],{

/***/ 30730:
/***/ (function(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _src_ol_Map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41564);
/* harmony import */ var _src_ol_source_Raster_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54272);
/* harmony import */ var _src_ol_View_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(87240);
/* harmony import */ var _src_ol_source_XYZ_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55238);
/* harmony import */ var _src_ol_layer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12185);
/* harmony import */ var _src_ol_layer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47085);
/* harmony import */ var _src_ol_proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28487);







function growRegion(inputs, data) {
  const image = inputs[0];
  let seed = data.pixel;
  const delta = parseInt(data.delta);
  if (!seed) {
    return image;
  }

  seed = seed.map(Math.round);
  const width = image.width;
  const height = image.height;
  const inputData = image.data;
  const outputData = new Uint8ClampedArray(inputData);
  const seedIdx = (seed[1] * width + seed[0]) * 4;
  const seedR = inputData[seedIdx];
  const seedG = inputData[seedIdx + 1];
  const seedB = inputData[seedIdx + 2];
  let edge = [seed];
  while (edge.length) {
    const newedge = [];
    for (let i = 0, ii = edge.length; i < ii; i++) {
      // As noted in the Raster source constructor, this function is provided
      // using the `lib` option. Other functions will NOT be visible unless
      // provided using the `lib` option.
      const next = next4Edges(edge[i]);
      for (let j = 0, jj = next.length; j < jj; j++) {
        const s = next[j][0];
        const t = next[j][1];
        if (s >= 0 && s < width && t >= 0 && t < height) {
          const ci = (t * width + s) * 4;
          const cr = inputData[ci];
          const cg = inputData[ci + 1];
          const cb = inputData[ci + 2];
          const ca = inputData[ci + 3];
          // if alpha is zero, carry on
          if (ca === 0) {
            continue;
          }
          if (
            Math.abs(seedR - cr) < delta &&
            Math.abs(seedG - cg) < delta &&
            Math.abs(seedB - cb) < delta
          ) {
            outputData[ci] = 255;
            outputData[ci + 1] = 0;
            outputData[ci + 2] = 0;
            outputData[ci + 3] = 255;
            newedge.push([s, t]);
          }
          // mark as visited
          inputData[ci + 3] = 0;
        }
      }
    }
    edge = newedge;
  }
  return {data: outputData, width: width, height: height};
}

function next4Edges(edge) {
  const x = edge[0];
  const y = edge[1];
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
}

const key = 'get_your_own_D6rA4zTHduk6KOKTXzGB';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const imagery = new _src_ol_layer_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A({
  source: new _src_ol_source_XYZ_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A({
    attributions: attributions,
    url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=' + key,
    tileSize: 512,
    maxZoom: 20,
    crossOrigin: '',
  }),
});

const raster = new _src_ol_source_Raster_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay({
  sources: [imagery.getSource()],
  operationType: 'image',
  operation: growRegion,
  // Functions in the `lib` object will be available to the operation run in
  // the web worker.
  lib: {
    next4Edges: next4Edges,
  },
});

const rasterImage = new _src_ol_layer_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A({
  opacity: 0.7,
  source: raster,
});

const map = new _src_ol_Map_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A({
  layers: [imagery, rasterImage],
  target: 'map',
  view: new _src_ol_View_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay({
    center: (0,_src_ol_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .fromLonLat */ .Rb)([-119.07, 47.65]),
    zoom: 11,
  }),
});

let coordinate;

map.on('click', function (event) {
  coordinate = event.coordinate;
  raster.changed();
});

const thresholdControl = document.getElementById('threshold');

raster.on('beforeoperations', function (event) {
  // the event.data object will be passed to operations
  const data = event.data;
  data.delta = thresholdControl.value;
  if (coordinate) {
    data.pixel = map.getPixelFromCoordinate(coordinate);
  }
});

function updateControlValue() {
  document.getElementById('threshold-value').innerText = thresholdControl.value;
}
updateControlValue();

thresholdControl.addEventListener('input', function () {
  updateControlValue();
  raster.changed();
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(30730));
/******/ }
]);
//# sourceMappingURL=region-growing.js.map