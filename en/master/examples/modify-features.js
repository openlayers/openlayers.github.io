var raster = new ol.layer.Tile({
  source: new ol.source.MapQuest({
    layer: 'sat'
  })
});

var source = new ol.source.GeoJSON({
  projection: 'EPSG:3857',
  url: 'data/geojson/countries.geojson'
});

var vector = new ol.layer.Vector({
  source: source
});

var select = new ol.interaction.Select({
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 2.5
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,255,255,0.6)'
    })
  })
});

var modify = new ol.interaction.Modify({
  features: select.getFeatures()
});

var map = new ol.Map({
  interactions: ol.interaction.defaults().extend([select, modify]),
  layers: [raster, vector],
  renderer: 'canvas',
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 2
  })
});
