/**
 * BlinkyTracerInv.js
 * Contains the class of a BlinkyTracer which cannot be destroyed by the player.
 */

class BlinkyTracerInv extends BlinkyTracer {
    /**
     * Create an invisible Blinky Tracer, the in the future most
     * hated atrocity by players.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {BlinkyTracerInv}
     */
    constructor(middleX, middleY){
        super(middleX,middleY);
        super.invalidate = func_noOp;
    }
}