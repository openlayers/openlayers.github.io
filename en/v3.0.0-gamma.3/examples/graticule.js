var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  renderer: 'canvas',
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([4.8, 47.75], 'EPSG:4326', 'EPSG:3857'),
    zoom: 5
  })
});

// Create the graticule component
var graticule = new ol.Graticule();
graticule.setMap(map);
