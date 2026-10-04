export default OSMXML;
export type OSMObject = {
    [x: string]: any;
};
export type OSMState = {
    /**
     * Nodes.
     */
    nodes: {
        [x: string]: import("../coordinate.js").Coordinate;
    };
    /**
     * Ways.
     */
    ways: Array<OSMObject>;
    /**
     * Features.
     */
    features: Array<import("../Feature.js").default>;
};
/**
 * @classdesc
 * Feature format for reading data in the
 * [OSMXML format](https://wiki.openstreetmap.org/wiki/OSM_XML).
 *
 * @api
 */
declare class OSMXML extends XMLFeature {
}
import XMLFeature from './XMLFeature.js';
//# sourceMappingURL=OSMXML.d.ts.map