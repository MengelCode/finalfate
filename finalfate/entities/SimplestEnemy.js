/**
 * SimplestEnemy.js
 * Contains the SimplestEnemy class along with its functions.
 * This enemy type remains stationary and cannot be killed.
 */

class SimplestEnemy extends Enemy {

    /**
     * Create a simple enemy object.
     * @param {type} middleX
     * @param {type} middleY
     * @returns {Meteor}
     */
    constructor(middleX, middleY) {
        super(middleX, middleY, simplestEnemy_dimension, simplestEnemy_update, 
        simplestEnemy_render);
    }
}

//"Simple Enemy" dimension function.
var simplestEnemy_dimension = simpleEnemy_dimension;

//"Simple Enemy" update function.
var simplestEnemy_update = func_noOp;

//"Simple Enemy" rendering function
var simplestEnemy_render = simpleEnemy_render;
