var raster = new ol.layer.Tile({
  source: new ol.source.MapQuest({layer: 'sat'})
});

var unselectedStyle = [new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255,255,255,0.25)'
  }),
  stroke: new ol.style.Stroke({
    color: '#6666ff'
  })
})];

var selectedStyle = [new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255,255,255,0.5)'
  })
})];

var vector = new ol.layer.Vector({
  source: new ol.source.GeoJSON({
    url: 'data/geojson/countries.geojson'
  }),
  styleFunction: function(feature, layer) {
    return unselectedStyle;
  }
});

var select = new ol.interaction.Select({
  featuresOverlay: new ol.render.FeaturesOverlay({
    styleFunction: function(feature, layer) {
      return selectedStyle;
    }
  })
});

var map = new ol.Map({
  interactions: ol.interaction.defaults().extend([select]),
  layers: [raster, vector],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 2
  })
});
