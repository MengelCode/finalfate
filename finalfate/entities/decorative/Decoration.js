/**
 * Decoration.js
 * The parent class of all graphical objects without game-relevant business
 * logic.
 */

class Decoration {
    /**
     * Creates a decoration object without look and function, located at the given coordinates.
     * @param {Integer} middleX
     * @param {Integer} middleY
     * @param {function()} renderRoutine
     * @param {function()} updateRoutine
     * @returns {Decoration}
     */
    constructor(middleX, middleY, renderRoutine = func_noOp, updateRoutine = 
            func_noOp){
        this.middleX = middleX;
        this.middleY = middleY;
        this.renderRoutine = renderRoutine;
        this.updateRoutine = updateRoutine;
    }

}