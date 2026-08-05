export default WMTSCapabilities;
export type WMTSObject = {
    [x: string]: any;
};
/**
 * @classdesc
 * Format for reading WMTS capabilities data.
 *
 * @api
 */
declare class WMTSCapabilities extends XML {
    /**
     * @type {OWS}
     * @private
     */
    private owsParser_;
}
import XML from './XML.js';
//# sourceMappingURL=WMTSCapabilities.d.ts.map