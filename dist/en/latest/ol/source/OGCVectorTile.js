/**
 * @module ol/source/OGCVectorTile
 */

import {error as logError} from '../console.js';
import VectorTileSource from './VectorTile.js';
import {getTileSetInfo} from './ogcTileUtil.js';

/**
 * @template {import("../Feature.js").FeatureLike} [FeatureType=import("../render/Feature.js").default]
 * @typedef {Object} Options
 * @property {string} url URL to the OGC Vector Tileset endpoint.
 * @property {Object} [context] A lookup of values to use in the tile URL template.  The `{tileMatrix}`
 * (zoom level), `{tileRow}`, and `{tileCol}` variables in the URL will always be provided by the source.
 * @property {import("../format/Feature.js").default<FeatureType>} [format] Feature format for tiles. Used and required by the default.
 * @property {string} [mediaType] The content type for the tiles (e.g. "application/vnd.mapbox-vector-tile").  If not provided,
 * the source will try to find a link with rel="item" that uses a vector type supported by the configured format.
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
 * @property {boolean} [overlaps=true] This source may have overlapping geometries. Setting this
 * to `false` (e.g. for sources with polygons that represent administrative
 * boundaries or TopoJSON sources) allows the renderer to optimise fill and
 * stroke operations.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection of the tile grid.
 * @property {typeof import("../VectorTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/VectorTile~VectorTile}.
 * @property {number} [transition] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * When set to `false`, only one world
 * will be rendered. When set to `true`, tiles will be wrapped horizontally to
 * render multiple worlds.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=1]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 * @property {Array<string>} [collections] A list of geospatial data sub-resources to include. If not provided, the entire dataset will
 * be included. This option is not applicable when requesting the tileset for a single collection.
 */

/**
 * @classdesc
 * Layer source for map tiles from an [OGC API - Tiles](https://ogcapi.ogc.org/tiles/) service that provides "vector" type tiles.
 * The service must conform to at least the core (http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/core)
 * and tileset (http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tileset) conformance classes. For supporting the `collections`
 * option, the service must conform to the collections selection
 * (http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/collections-selection) conformance class.
 *
 * Vector tile sets may come in a variety of formats (e.g. GeoJSON, MVT).  The `format` option is used to determine
 * which of the advertised media types is used.  If you need to force the use of a particular media type, you can
 * provide the `mediaType` option.
 * @api
 * @template {import("../Feature.js").FeatureLike} [FeatureType=import("../render/Feature.js").default]
 * @extends {VectorTileSource<FeatureType>}
 */
class OGCVectorTile extends VectorTileSource {
  /**
   * @param {Options<FeatureType>} options OGC vector tile options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      cacheSize: options.cacheSize,
      format: options.format,
      overlaps: options.overlaps,
      projection: options.projection,
      tileClass: options.tileClass,
      transition: options.transition,
      wrapX: options.wrapX,
      zDirection: options.zDirection,
      state: 'loading',
    });

    const sourceInfo = {
      url: options.url,
      projection: this.getProjection(),
      mediaType: options.mediaType,
      supportedMediaTypes: options.format.supportedMediaTypes,
      context: options.context || null,
      collections: options.collections,
    };

    getTileSetInfo(sourceInfo)
      .then(this.handleTileSetInfo_.bind(this))
      .catch(this.handleError_.bind(this));
  }

  /**
   * @param {import("./ogcTileUtil.js").TileSetInfo} tileSetInfo Tile set info.
   * @private
   */
  handleTileSetInfo_(tileSetInfo) {
    this.tileGrid = tileSetInfo.grid;
    this.projection = tileSetInfo.projection;
    this.setTileUrlFunction(tileSetInfo.urlFunction, tileSetInfo.urlTemplate);
    this.setState('ready');
  }

  /**
   * @private
   * @param {Error} error The error.
   */
  handleError_(error) {
    logError(error);
    this.setState('error');
  }
}

export default OGCVectorTile;
