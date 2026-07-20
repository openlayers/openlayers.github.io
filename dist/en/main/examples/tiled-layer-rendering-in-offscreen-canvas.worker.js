import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import {createXYZ} from 'ol/tilegrid.js';

const worker = self;

const tileGrid = createXYZ({
  tileSize: [512, 512],
});

const canvas = new OffscreenCanvas(512, 512);

const map = new Map({
  target: canvas,
  layers: [
    new TileLayer({
      source: new OSM({
        // No need to fade in tiles in the worker
        transition: 0,
      }),
    }),
  ],
});

worker.addEventListener('message', async ({data: {action, tile}}) => {
  if (action !== 'render') {
    return;
  }
  const view = new View({
    center: tileGrid.getTileCoordCenter(tile),
    resolution: tileGrid.getResolution(tile[0]),
  });
  map.setView(view);
  map.once('rendercomplete', () => {
    const imageData = canvas.transferToImageBitmap();
    worker.postMessage({action: 'rendered', imageData: imageData}, [imageData]);
  });
});
