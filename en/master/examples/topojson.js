var raster = new ol.layer.TileLayer({
  source: new ol.source.TileJSON({
    url: 'http://api.tiles.mapbox.com/v3/mapbox.world-dark.jsonp'
  })
});

var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'data/topojson/world-110m.json',
    parser: new ol.parser.TopoJSON()
  }),
  style: new ol.style.Style({rules: [
    new ol.style.Rule({
      symbolizers: [
        new ol.style.Polygon({
          strokeColor: '#FFF',
          fillColor: '#BADA55',
          strokeWidth: 1.5,
          opacity: 0.5
        })
      ]
    })
  ]})
});

var map = new ol.Map({
  layers: [raster, vector],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 1
  })
});
