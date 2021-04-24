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
    constructor(middleX,middleY,color = "#DDCC11",inputCode = undefined,speed = 15){
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        this.radius = 18;
        this.inputCode = inputCode;
        this.color = color;
        this.speed = speed;
        this.cannonX = getRandomX(true);
    }
}
/**
 * 
 * Update function of the space cannon's crossfire.
 */
SpaceCannon.prototype.updateState = function(){
    validateReleasedState();
    //The input system is still not good - use this in order.
    if(this.inputCode === undefined){
        if(up){
            this.middleY-=this.speed;
        }
        else if(down){
           this.middleY+=this.speed; 
        }
        if(left){
            this.middleX-=this.speed;
        }
        else if(right){
           this.middleX+=this.speed; 
        }
        if(shootReleased && shoot){
            displayList.addElement(new CannonShot(this.cannonX,620,this.middleX,this.middleY));
            shootReleased = false;
        }
    }
};

/**
 * Rendering function of the space cannon's crossfire.
 * 
 */
SpaceCannon.prototype.renderState = function(){
context.fillStyle = this.color;
context.fillText(this.middleY,20,20);
//Begin: Draw the circle.    
context.beginPath();
context.lineWidth = 2;
context.strokeStyle = this.color;
context.arc(this.middleX, this.middleY, this.radius, 0, 2 * Math.PI, true);
context.stroke();
//End: Draw the circle.
//Begin: Lines.
context.beginPath();
context.lineWidth = 2;
context.strokeStyle = this.color;
context.moveTo(this.middleX-this.radius,this.middleY);
context.lineTo(this.middleX+this.radius,this.middleY);
context.moveTo(this.middleX,this.middleY-this.radius);
context.lineTo(this.middleX,this.middleY+this.radius);
context.stroke();
//End: Lines.
};

