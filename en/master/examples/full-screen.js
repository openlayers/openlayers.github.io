var view = new ol.View({
  center: [-9101767, 2822912],
  zoom: 14
});

var map = new ol.Map({
  controls: ol.control.defaults().extend([
    new ol.control.FullScreen()
  ]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.BingMaps({
        key: 'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF',
        imagerySet: 'Aerial'
      })
    })
  ],
  renderer: common.getRendererFromQueryString(),
  target: 'map',
  view: view
});
