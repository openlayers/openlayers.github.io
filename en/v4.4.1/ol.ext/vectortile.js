
/**
 * @fileoverview
 * @suppress {accessControls, ambiguousFunctionDecl, checkDebuggerStatement, checkRegExp, checkTypes, checkVars, const, constantProperty, deprecated, duplicate, es5Strict, fileoverviewTags, missingProperties, nonStandardJsDocs, strictModuleDepCheck, suspiciousCode, undefinedNames, undefinedVars, unknownDefines, unusedLocalVariables, uselessCode, visibility}
 */
goog.provide('ol.ext.vectortile.VectorTile');

/** @typedef {function(*)} */
ol.ext.vectortile.VectorTile = function() {};

(function() {(function (exports) {
'use strict';

var pointGeometry = Point;
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype = {
    clone: function() { return new Point(this.x, this.y); },
    add:     function(p) { return this.clone()._add(p); },
    sub:     function(p) { return this.clone()._sub(p); },
    multByPoint:    function(p) { return this.clone()._multByPoint(p); },
    divByPoint:     function(p) { return this.clone()._divByPoint(p); },
    mult:    function(k) { return this.clone()._mult(k); },
    div:     function(k) { return this.clone()._div(k); },
    rotate:  function(a) { return this.clone()._rotate(a); },
    rotateAround:  function(a,p) { return this.clone()._rotateAround(a,p); },
    matMult: function(m) { return this.clone()._matMult(m); },
    unit:    function() { return this.clone()._unit(); },
    perp:    function() { return this.clone()._perp(); },
    round:   function() { return this.clone()._round(); },
    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    equals: function(other) {
        return this.x === other.x &&
               this.y === other.y;
    },
    dist: function(p) {
        return Math.sqrt(this.distSqr(p));
    },
    distSqr: function(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return dx * dx + dy * dy;
    },
    angle: function() {
        return Math.atan2(this.y, this.x);
    },
    angleTo: function(b) {
        return Math.atan2(this.y - b.y, this.x - b.x);
    },
    angleWith: function(b) {
        return this.angleWithSep(b.x, b.y);
    },
    angleWithSep: function(x, y) {
        return Math.atan2(
            this.x * y - this.y * x,
            this.x * x + this.y * y);
    },
    _matMult: function(m) {
        var x = m[0] * this.x + m[1] * this.y,
            y = m[2] * this.x + m[3] * this.y;
        this.x = x;
        this.y = y;
        return this;
    },
    _add: function(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    },
    _sub: function(p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    },
    _mult: function(k) {
        this.x *= k;
        this.y *= k;
        return this;
    },
    _div: function(k) {
        this.x /= k;
        this.y /= k;
        return this;
    },
    _multByPoint: function(p) {
        this.x *= p.x;
        this.y *= p.y;
        return this;
    },
    _divByPoint: function(p) {
        this.x /= p.x;
        this.y /= p.y;
        return this;
    },
    _unit: function() {
        this._div(this.mag());
        return this;
    },
    _perp: function() {
        var y = this.y;
        this.y = this.x;
        this.x = -y;
        return this;
    },
    _rotate: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = cos * this.x - sin * this.y,
            y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    },
    _rotateAround: function(angle, p) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y),
            y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
        this.x = x;
        this.y = y;
        return this;
    },
    _round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
};
Point.convert = function (a) {
    if (a instanceof Point) {
        return a;
    }
    if (Array.isArray(a)) {
        return new Point(a[0], a[1]);
    }
    return a;
};

var vectortilefeature = VectorTileFeature$1;
function VectorTileFeature$1(pbf, end, extent, keys, values) {
    this.properties = {};
    this.extent = extent;
    this.type = 0;
    this._pbf = pbf;
    this._geometry = -1;
    this._keys = keys;
    this._values = values;
    pbf.readFields(readFeature, this, end);
}
function readFeature(tag, feature, pbf) {
    if (tag == 1) feature.id = pbf.readVarint();
    else if (tag == 2) readTag(pbf, feature);
    else if (tag == 3) feature.type = pbf.readVarint();
    else if (tag == 4) feature._geometry = pbf.pos;
}
function readTag(pbf, feature) {
    var end = pbf.readVarint() + pbf.pos;
    while (pbf.pos < end) {
        var key = feature._keys[pbf.readVarint()],
            value = feature._values[pbf.readVarint()];
        feature.properties[key] = value;
    }
}
VectorTileFeature$1.types = ['Unknown', 'Point', 'LineString', 'Polygon'];
VectorTileFeature$1.prototype.loadGeometry = function() {
    var pbf = this._pbf;
    pbf.pos = this._geometry;
    var end = pbf.readVarint() + pbf.pos,
        cmd = 1,
        length = 0,
        x = 0,
        y = 0,
        lines = [],
        line;
    while (pbf.pos < end) {
        if (!length) {
            var cmdLen = pbf.readVarint();
            cmd = cmdLen & 0x7;
            length = cmdLen >> 3;
        }
        length--;
        if (cmd === 1 || cmd === 2) {
            x += pbf.readSVarint();
            y += pbf.readSVarint();
            if (cmd === 1) {
                if (line) lines.push(line);
                line = [];
            }
            line.push(new pointGeometry(x, y));
        } else if (cmd === 7) {
            if (line) {
                line.push(line[0].clone());
            }
        } else {
            throw new Error('unknown command ' + cmd);
        }
    }
    if (line) lines.push(line);
    return lines;
};
VectorTileFeature$1.prototype.bbox = function() {
    var pbf = this._pbf;
    pbf.pos = this._geometry;
    var end = pbf.readVarint() + pbf.pos,
        cmd = 1,
        length = 0,
        x = 0,
        y = 0,
        x1 = Infinity,
        x2 = -Infinity,
        y1 = Infinity,
        y2 = -Infinity;
    while (pbf.pos < end) {
        if (!length) {
            var cmdLen = pbf.readVarint();
            cmd = cmdLen & 0x7;
            length = cmdLen >> 3;
        }
        length--;
        if (cmd === 1 || cmd === 2) {
            x += pbf.readSVarint();
            y += pbf.readSVarint();
            if (x < x1) x1 = x;
            if (x > x2) x2 = x;
            if (y < y1) y1 = y;
            if (y > y2) y2 = y;
        } else if (cmd !== 7) {
            throw new Error('unknown command ' + cmd);
        }
    }
    return [x1, y1, x2, y2];
};
VectorTileFeature$1.prototype.toGeoJSON = function(x, y, z) {
    var size = this.extent * Math.pow(2, z),
        x0 = this.extent * x,
        y0 = this.extent * y,
        coords = this.loadGeometry(),
        type = VectorTileFeature$1.types[this.type],
        i, j;
    function project(line) {
        for (var j = 0; j < line.length; j++) {
            var p = line[j], y2 = 180 - (p.y + y0) * 360 / size;
            line[j] = [
                (p.x + x0) * 360 / size - 180,
                360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90
            ];
        }
    }
    switch (this.type) {
    case 1:
        var points = [];
        for (i = 0; i < coords.length; i++) {
            points[i] = coords[i][0];
        }
        coords = points;
        project(coords);
        break;
    case 2:
        for (i = 0; i < coords.length; i++) {
            project(coords[i]);
        }
        break;
    case 3:
        coords = classifyRings(coords);
        for (i = 0; i < coords.length; i++) {
            for (j = 0; j < coords[i].length; j++) {
                project(coords[i][j]);
            }
        }
        break;
    }
    if (coords.length === 1) {
        coords = coords[0];
    } else {
        type = 'Multi' + type;
    }
    var result = {
        type: "Feature",
        geometry: {
            type: type,
            coordinates: coords
        },
        properties: this.properties
    };
    if ('id' in this) {
        result.id = this.id;
    }
    return result;
};
function classifyRings(rings) {
    var len = rings.length;
    if (len <= 1) return [rings];
    var polygons = [],
        polygon,
        ccw;
    for (var i = 0; i < len; i++) {
        var area = signedArea(rings[i]);
        if (area === 0) continue;
        if (ccw === undefined) ccw = area < 0;
        if (ccw === area < 0) {
            if (polygon) polygons.push(polygon);
            polygon = [rings[i]];
        } else {
            polygon.push(rings[i]);
        }
    }
    if (polygon) polygons.push(polygon);
    return polygons;
}
function signedArea(ring) {
    var sum = 0;
    for (var i = 0, len = ring.length, j = len - 1, p1, p2; i < len; j = i++) {
        p1 = ring[i];
        p2 = ring[j];
        sum += (p2.x - p1.x) * (p1.y + p2.y);
    }
    return sum;
}

var vectortilelayer = VectorTileLayer$1;
function VectorTileLayer$1(pbf, end) {
    this.version = 1;
    this.name = null;
    this.extent = 4096;
    this.length = 0;
    this._pbf = pbf;
    this._keys = [];
    this._values = [];
    this._features = [];
    pbf.readFields(readLayer, this, end);
    this.length = this._features.length;
}
function readLayer(tag, layer, pbf) {
    if (tag === 15) layer.version = pbf.readVarint();
    else if (tag === 1) layer.name = pbf.readString();
    else if (tag === 5) layer.extent = pbf.readVarint();
    else if (tag === 2) layer._features.push(pbf.pos);
    else if (tag === 3) layer._keys.push(pbf.readString());
    else if (tag === 4) layer._values.push(readValueMessage(pbf));
}
function readValueMessage(pbf) {
    var value = null,
        end = pbf.readVarint() + pbf.pos;
    while (pbf.pos < end) {
        var tag = pbf.readVarint() >> 3;
        value = tag === 1 ? pbf.readString() :
            tag === 2 ? pbf.readFloat() :
            tag === 3 ? pbf.readDouble() :
            tag === 4 ? pbf.readVarint64() :
            tag === 5 ? pbf.readVarint() :
            tag === 6 ? pbf.readSVarint() :
            tag === 7 ? pbf.readBoolean() : null;
    }
    return value;
}
VectorTileLayer$1.prototype.feature = function(i) {
    if (i < 0 || i >= this._features.length) throw new Error('feature index out of bounds');
    this._pbf.pos = this._features[i];
    var end = this._pbf.readVarint() + this._pbf.pos;
    return new vectortilefeature(this._pbf, end, this.extent, this._keys, this._values);
};

var vectortile = VectorTile$1;
function VectorTile$1(pbf, end) {
    this.layers = pbf.readFields(readTile, {}, end);
}
function readTile(tag, layers, pbf) {
    if (tag === 3) {
        var layer = new vectortilelayer(pbf, pbf.readVarint() + pbf.pos);
        if (layer.length) layers[layer.name] = layer;
    }
}

var VectorTile = vectortile;
var VectorTileFeature = vectortilefeature;
var VectorTileLayer = vectortilelayer;
var vectorTile = {
	VectorTile: VectorTile,
	VectorTileFeature: VectorTileFeature,
	VectorTileLayer: VectorTileLayer
};

exports['default'] = vectorTile;
exports.VectorTile = VectorTile;
exports.VectorTileFeature = VectorTileFeature;
exports.VectorTileLayer = VectorTileLayer;

}((this.vectortile = this.vectortile || {})));}).call(ol.ext);
