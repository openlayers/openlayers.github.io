var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.BingMaps({
        key: 'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF',
        imagerySet: 'Aerial'
      })
    })
  ],
  view: new ol.View({
    center: [-13553864, 5918250],
    zoom: 11,
    minZoom: 9,
    maxZoom: 13
  })
});
