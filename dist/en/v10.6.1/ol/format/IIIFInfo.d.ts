/**
 * Enum representing the major IIIF Image API versions
 */
export type Versions = string;
export namespace Versions {
    let VERSION1: string;
    let VERSION2: string;
    let VERSION3: string;
}
export default IIIFInfo;
export type PreferredOptions = {
    /**
     * Preferred image format. Will be used if the image information
     * indicates support for that format.
     */
    format?: string | undefined;
    /**
     * IIIF image qualitiy.  Will be used if the image information
     * indicates support for that quality.
     */
    quality?: string | undefined;
};
export type SupportedFeatures = {
    /**
     * Supported IIIF image size and region
     * calculation features.
     */
    supports?: string[] | undefined;
    /**
     * Supported image formats.
     */
    formats?: string[] | undefined;
    /**
     * Supported IIIF image qualities.
     */
    qualities?: string[] | undefined;
};
export type TileInfo = {
    /**
     * Supported resolution scaling factors.
     */
    scaleFactors: Array<number>;
    /**
     * Tile width in pixels.
     */
    width: number;
    /**
     * Tile height in pixels. Same as tile width if height is
     * not given.
     */
    height?: number | undefined;
};
export type IiifProfile = {
    /**
     * Supported image formats for the image service.
     */
    formats?: string[] | undefined;
    /**
     * Supported IIIF image qualities.
     */
    qualities?: string[] | undefined;
    /**
     * Supported features.
     */
    supports?: string[] | undefined;
    /**
     * Maximum area (pixels) available for this image service.
     */
    maxArea?: number | undefined;
    /**
     * Maximum height.
     */
    maxHeight?: number | undefined;
    /**
     * Maximum width.
     */
    maxWidth?: number | undefined;
};
export type ImageInformationResponse = {
    [x: string]: string | number | (string | number | IiifProfile | {
        [x: string]: number;
    } | TileInfo)[];
};
/**
 * @classdesc
 * Format for transforming IIIF Image API image information responses into
 * IIIF tile source ready options
 *
 * @api
 */
declare class IIIFInfo {
    /**
     * @param {string|ImageInformationResponse} imageInfo
     * Deserialized image information JSON response object or JSON response as string
     */
    constructor(imageInfo: string | ImageInformationResponse);
    /**
     * @param {string|ImageInformationResponse} imageInfo
     * Deserialized image information JSON response object or JSON response as string
     * @api
     */
    setImageInfo(imageInfo: string | ImageInformationResponse): void;
    imageInfo: any;
    /**
     * @return {Versions|undefined} Major IIIF version.
     * @api
     */
    getImageApiVersion(): Versions | undefined;
    /**
     * @param {Versions} version Optional IIIF image API version
     * @return {string|undefined} Compliance level as it appears in the IIIF image information
     * response.
     */
    getComplianceLevelEntryFromProfile(version: Versions): string | undefined;
    /**
     * @param {Versions} version Optional IIIF image API version
     * @return {string} Compliance level, on of 'level0', 'level1' or 'level2' or undefined
     */
    getComplianceLevelFromProfile(version: Versions): string;
    /**
     * @return {SupportedFeatures|undefined} Image formats, qualities and region / size calculation
     * methods that are supported by the IIIF service.
     */
    getComplianceLevelSupportedFeatures(): SupportedFeatures | undefined;
    /**
     * @param {PreferredOptions} [preferredOptions] Optional options for preferred format and quality.
     * @return {import("../source/IIIF.js").Options|undefined} IIIF tile source ready constructor options.
     * @api
     */
    getTileSourceOptions(preferredOptions?: PreferredOptions): import("../source/IIIF.js").Options | undefined;
}
//# sourceMappingURL=IIIFInfo.d.ts.map