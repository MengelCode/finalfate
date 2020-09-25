/**
 * Blinky.js
 * Contains the Blinky class along with its functions.
 */


class Blinky extends Enemy {
    /**
     * Create a blinky enemy object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Blinky}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, blinky_dimension, blinky_update, blinky_render, blinky_damage());
    }
}

//"Blinky" update function.
function blinky_update() {
    this.frameCounter++;
    this.frameCounter = this.frameCounter % 1;
    if (this.frameCounter === 0) {
        this.middleY = this.middleY + 1;
    }
}

//"Blinky" rendering function
function blinky_render() {
//Num pad on mobile.
    if (aniCount % 5 === 0) {
        context.fillStyle = "red";
    } else if (aniCount % 4 === 0) {
        context.fillStyle = "yellow";
    } else if (aniCount % 3 === 0) {
        context.fillStyle = "magenta";
    } else if (aniCount % 2 === 0) {
        context.fillStyle = "white";
    } else
        context.fillStyle = "green";
    simpleSquare_render.call(this);
}

//"Blinky" damage function.
function blinky_damage() {
    return 22;
}

//"Blinky" dimension function.
var blinky_dimension = meteor_dimension;