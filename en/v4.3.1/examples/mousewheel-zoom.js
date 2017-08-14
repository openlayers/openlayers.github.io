var map = new ol.Map({
  interactions: ol.interaction.defaults({mouseWheelZoom: false}).extend([
    new ol.interaction.MouseWheelZoom({
      constrainResolution: true // force zooming to a integer zoom
    })
  ]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});
