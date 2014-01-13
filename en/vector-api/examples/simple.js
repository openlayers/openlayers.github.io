var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  renderers: ol.RendererHints.createFromQueryData(),
  ol3Logo: false,
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 2
  })
});
