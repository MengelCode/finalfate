/**
 * BlinkyTracer.js
 * Contains the BlinkyTracer class along with its functions.
 */


class BlinkyTracer extends Enemy {
    /**
     * Create a blinky enemy object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Blinky}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, blinkyTracer_dimension, blinkyTracer_update, 
        blinkyTracer_render, blinkyTracer_damage());
    }
}
//"Blinky Tracer" dimension function.
var blinkyTracer_dimension = blinky_dimension;

//"Blinky Tracer" update function.
function blinkyTracer_update() {
    this.frameCounter++;
    this.middleY++;
    if (player.middleX > this.middleX)
        this.middleX++;
    else if (player.middleX < this.middleX)
        this.middleX--;
}

//"Blinky Tracer" rendering function.
var blinkyTracer_render = blinky_render;

//"Blinky Tracer" damage function.
function blinkyTracer_damage() {
    return 36;
}