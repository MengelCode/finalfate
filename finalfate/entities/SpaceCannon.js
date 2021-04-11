/**
 * SpaceCannon.js
 * Contains the Player class along with its functions.
 * Much of the in-game functionality, including moving, will go here.
 */


class SpaceCannon extends GameObject {
    /**
     * The class for the cannon the players will be steering in "Party Mode".
     * @param {type} posX The X position of the cursor to place.
     * @param {type} posY The Y position of the cursor to place.
     * @param {type} inputCode The input code of the input method. That can be a
     * number of the corresponding input device (an index) or an object indicating
     * how the cannon is controlled.
     * @param {type} color Color string used upon rendering.
     * @returns {SpaceCannon}
     */
    constructor(middleX,middleY,inputCode = undefined,color = "#DDCC11"){
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        this.radius = 60;
        this.inputCode = inputCode;
        this.color = color;
    }
}
/**
 * Rendering function of the space cannon's crossfire.
 * 
 */
SpaceCannon.prototype.renderState = function(){
context.fillStyle = this.color;
context.lineWidth = 20;
context.beginPath();
context.arc(this.middleX, this.middleY, this.radius, 0, 2 * Math.PI, false);
context.stroke();
};

