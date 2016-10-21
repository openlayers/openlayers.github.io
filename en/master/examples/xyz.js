var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'
      })
    })
  ],
  view: new ol.View({
    center: [-472202, 7530279],
    zoom: 12
  })
});
