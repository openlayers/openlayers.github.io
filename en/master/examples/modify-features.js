var raster = new ol.layer.Tile({
  source: new ol.source.MapQuestOpenAerial()
});

var vector = new ol.layer.Vector({
  id: 'vector',
  source: new ol.source.Vector({
    parser: new ol.parser.ogc.GML_v3(),
    url: 'data/gml/topp-states-wfs.xml'
  }),
  style: new ol.style.Style({
    rules: [
      new ol.style.Rule({
        filter: 'renderIntent("selected")',
        symbolizers: [
          new ol.style.Fill({
            color: '#ffffff',
            opacity: 0.2
          }),
          new ol.style.Stroke({
            color: 'white',
            width: 5
          }),
          new ol.style.Stroke({
            color: '#0099ff',
            width: 3
          })
        ]
      }),
      new ol.style.Rule({
        filter: 'renderIntent("temporary")',
        symbolizers: [
          new ol.style.Shape({
            fill: new ol.style.Fill({
              color: '#0099ff',
              opacity: 1
            }),
            stroke: new ol.style.Stroke({
              color: 'white',
              opacity: 0.75
            }),
            size: 14,
            zIndex: 1
          })
        ]
      }),
      new ol.style.Rule({
        filter: 'renderIntent("future")',
        symbolizers: [
          new ol.style.Shape({
            fill: new ol.style.Fill({
              color: '#00ff33',
              opacity: 1
            }),
            stroke: new ol.style.Stroke({
              color: 'white',
              opacity: 0.75
            }),
            size: 14,
            zIndex: 1
          })
        ]
      })
    ],
    symbolizers: [
      new ol.style.Fill({
        color: '#ffffff',
        opacity: 0.1
      }),
      new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
      })
    ]
  })
});

var select = new ol.interaction.Select();

var modify = new ol.interaction.Modify();

var map = new ol.Map({
  interactions: ol.interaction.defaults().extend([select, modify]),
  layers: [raster, vector],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [-11000000, 4600000],
    zoom: 4
  })
});
