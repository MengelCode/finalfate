/**
 * Meteor.js
 * Contains the Meteor class along with its functions.
 */

class Meteor extends Enemy {
    /**
     * Create a meteor object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Meteor}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, meteor_dimension, meteor_update, meteor_render, meteor_damage());
    }
}

//"Meteor" dimension function.
var meteor_dimension = simpleEnemy_dimension;

//"Meteor" update function.
function meteor_update() {
    slowMove_update.call(this);
}

//"Meteor" rendering function
function meteor_render() {
//Num pad on mobile.
    context.fillStyle = "brown";
    simpleSquare_render.call(this);
}

//"Meteor" damage function.
function meteor_damage() {
    return 17;
}