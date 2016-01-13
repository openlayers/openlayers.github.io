var canvas = document.getElementById('canvas');
var render = ol.render.toContext(canvas.getContext('2d'), {size: [100, 100]});

var fill = new ol.style.Fill({color: 'blue'});
var stroke = new ol.style.Stroke({color: 'black'});
render.setFillStrokeStyle(fill, stroke);
render.setImageStyle(new ol.style.Circle({
  radius: 10,
  fill: fill,
  stroke: stroke
}));

render.drawLineStringGeometry(new ol.geom.LineString([[10, 10], [90, 90]]));
render.drawPolygonGeometry(
    new ol.geom.Polygon([[[2, 2], [98, 2], [2, 98], [2, 2]]]));
render.drawPointGeometry(new ol.geom.Point([88, 88]));
