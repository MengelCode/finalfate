/**
 * SimpleEnemy.js
 * Contains the SimpleEnemy class along with its functions.
 */

class SimpleEnemy extends Enemy {

    /**
     * Create a simple enemy object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Meteor}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, simpleEnemy_dimension, simpleEnemy_update, simpleEnemy_render);
    }
}

//"Simple Enemy" dimension function.
function simpleEnemy_dimension(dummyX, dummyY) {
    var x = [this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1, this.middleX - 1, this.middleX, this.middleX + 1];
    var y = [this.middleY - 3, this.middleY - 3, this.middleY - 3, this.middleY - 2, this.middleY - 2, this.middleY - 2, this.middleY - 1, this.middleY - 1, this.middleY - 1, this.middleY, this.middleY, this.middleY, this.middleY + 1, this.middleY + 1, this.middleY + 1];
    return new Array(x, y);
}

//"Simple Enemy" update function.
function simpleEnemy_update() {
    this.frameCounter++;
    this.frameCounter = this.frameCounter % 2;
    if (this.frameCounter === 1) {
        this.middleY = this.middleY + 1;
    }
}

//"Simple Enemy" rendering function
function simpleEnemy_render() {
//Num pad on mobile.
    context.fillStyle = "white";
    simpleSquare_render.call(this);
}