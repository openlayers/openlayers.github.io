export type WebGLWorkerMessageType = string;
export namespace WebGLWorkerMessageType {
    let GENERATE_POLYGON_BUFFERS: string;
    let GENERATE_POINT_BUFFERS: string;
    let GENERATE_LINE_STRING_BUFFERS: string;
}
export type TextOverlayWorkerMessageType = string;
export namespace TextOverlayWorkerMessageType {
    let BUILD_INSTRUCTIONS: string;
    let DISPOSE_INSTRUCTIONS: string;
    let RENDER: string;
}
/**
 * This message will trigger the generation of a vertex and an index buffer based on the given render instructions.
 * When the buffers are generated, the worked will send a message of the same type to the main thread, with
 * the generated buffers in it.
 * Note that any addition properties present in the message *will* be sent back to the main thread.
 */
export type WebGLWorkerGenerateBuffersMessage = {
    /**
     * Message type
     */
    type: WebGLWorkerMessageType;
    /**
     * render instructions raw binary buffer.
     */
    renderInstructions: ArrayBufferLike;
    /**
     * Amount of hit detection + custom attributes count in the render instructions.
     */
    customAttributesSize?: number | undefined;
    /**
     * Indices array raw binary buffer (sent by the worker).
     */
    indicesBuffer?: ArrayBuffer | undefined;
    /**
     * Vertex attributes array raw binary buffer (sent by the worker).
     */
    vertexAttributesBuffer?: ArrayBuffer | undefined;
    /**
     * Instance attributes array raw binary buffer (sent by the worker).
     */
    instanceAttributesBuffer?: ArrayBuffer | undefined;
    /**
     * Transformation matrix used to project the instructions coordinates
     */
    renderInstructionsTransform?: number[] | undefined;
    /**
     * Message id; will be used both in request and response as a means of identification
     */
    id?: number | undefined;
};
/**
 * These messages are used to prepare text rendering on the text overlay worker:
 * - BUILD_INSTRUCTIONS is used to transform render instructions into canvas text rendering batches
 * - RENDER is used to actually draw all current text rendering batches on the offscreen canvas; the render list is cleared after each render
 */
export type TextOverlayWorkerMessage = {
    /**
     * Message type
     */
    type: TextOverlayWorkerMessageType;
    /**
     * Polygon render instructions array buffer
     */
    polygonRenderInstructions?: ArrayBuffer | undefined;
    /**
     * Line string render instructions array buffer
     */
    lineStringRenderInstructions?: ArrayBuffer | undefined;
    /**
     * Point render instructions array buffer
     */
    pointRenderInstructions?: ArrayBuffer | undefined;
    /**
     * Rendered canvas
     */
    imageData?: ImageBitmap | undefined;
    /**
     * Frame state of the rendered image
     */
    frameState?: import("../../Map.js").FrameState | undefined;
    /**
     * Key corresponding to a generated text instructions set
     */
    instructionsSetKey?: string | undefined;
    /**
     * Flat style
     */
    style?: import("../../style/flat.js").FlatStyleLike | undefined;
    /**
     * Labels array
     */
    labelsArray?: Uint8Array<ArrayBufferLike> | undefined;
    /**
     * Size of each custom attribute (by name)
     */
    customAttributesSizes?: {
        [x: string]: number;
    } | undefined;
    /**
     * Transformation matrix used to project the instructions coordinates
     */
    renderInstructionsTransform?: number[] | undefined;
    /**
     * View resolution, required for the BUILD_INSTRUCTIONS step
     */
    resolution?: number | undefined;
    /**
     * Message id; will be used both in request and response as a means of identification
     */
    id?: number | undefined;
};
//# sourceMappingURL=constants.d.ts.map