export default LabelsArray;
/**
 * @classdesc
 * This class stores text values using typed arrays internally.
 * Labels are stored as separate UTF-8 characters in a single Uint8Array.
 * The Uint8Array is resized when the capacity exceeds to avoid costly concatenation.
 */
declare class LabelsArray {
    /**
     * @private
     */
    private array_;
    actualSize_: number;
    /**
     * @type {Map<string, Array<number>>}
     * @private
     */
    private labelPositionMap_;
    /**
     * @param {string} label Label to append to the end of the array
     * @return {Array<number>} An array containing 1/ the position of the label in the typed array and 2/ the size of the label in the array
     */
    push(label: string): Array<number>;
    /**
     * @return {Uint8Array} Typed array containing the encoded labels.
     */
    getArray(): Uint8Array;
}
//# sourceMappingURL=LabelsArray.d.ts.map