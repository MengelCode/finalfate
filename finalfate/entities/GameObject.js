/**
 * GameObject.js
 * Contains the GameObject class along with its functions.
 * All game-relevant entities inherit this.
 */

class GameObject {
    /**
     * This is the root class in the small class hierarchy of the game.
     * 
     */
    constructor() {
        this.frameCounter = 0;
        /**
         * Is this object still required? Set this value to true (via the invalidate function) to mark it for
         * deletion before the next frame.
         */
        this.invalid = false;
        /**Returns an array of 2 arrays.
         //X positions occupied = array 0.
         Y positions occupied = array 1.
         **/
    }

}

/**
 * Update routine for an object. Every game object should have one.
 */
GameObject.prototype.updateState = func_noOp;

/**
 * Rendering routine for an object. Required to make a game object visible.
 */
GameObject.prototype.renderState = func_noOp;


/**
 * 
 * Mark the object as no longer required.
 * 
 */
GameObject.prototype.invalidate = function () {
    this.invalid = true;
};


/**
 * Get the collision matrix of a specific object. Empty unless it is overriden.
 * @returns {Array}
 */
GameObject.prototype.getOccupiedSpace = function () {
    return new Array({}, {});
};



/**
 * 
 * @param {GameObject} otherObj
 * @returns {boolean} If this object collides with the given object.
 */
GameObject.prototype.collides = function (otherObj) {
    var ownSpace = this.getOccupiedSpace();
    var otherSpace = otherObj.getOccupiedSpace();
    for (var i = 0; i < ownSpace[0].length; i++) {
        for (var j = 0; j < otherSpace.length; j++) {
            if (ownSpace[0][i] === otherSpace[0][j] && ownSpace[1][i] === otherSpace[1][j]) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Function which does return an empty collision matrix.
 * Useful to make something not touchable.
 * @returns {Array}
 */
function func_noDim() {
    return [[], []];
}
