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
    constructor(middleX,middleY,speed = 15){
        super();
        this.middleX = middleX;
        this.middleY = middleY;
        this.radius = 18;
        this.playerNo = 0;
        this.inputCode = "MOUSE";
        this.color = "#DDCC11";
        this.speed = speed;
        this.score = 0;
        this.cannonX = getRandomX(true);
    }
}
/**
 * 
 * Update function of the space cannon's crossfire.
 */
SpaceCannon.prototype.updateState = function(){
    //The input system is still not good - use this in order.
    if(this.inputCode === undefined){
        validateReleasedState();
        if(up && this.middleY>this.speed){
            this.middleY-=this.speed;
        }
        else if(down && this.middleY<550-this.speed){
           this.middleY+=this.speed; 
        }
        if(left && this.middleX>this.speed){
            this.middleX-=this.speed;
        }
        else if(right && this.middleX<800-this.speed){
           this.middleX+=this.speed; 
        }
        if(shootReleased && shoot){
            var shot = new CannonShot(this.cannonX,620,this.middleX,
            this.middleY,this.playerNo,this.color);
            displayList.addElement(shot);
            bulletList.addElement(shot);
            shootReleased = false;
        }
    }
    else if(this.inputCode === "MOUSE"){
        this.middleX = sani_LeftPosX;
        this.middleY = sani_LeftPosY;
        if(!mouse_LeftPressed){
            shootReleased = true;
        }
       else if(shootReleased && mouse_LeftPressed){
           //window.alert("Test.");
            var shot = new CannonShot(this.cannonX, 620, this.middleX,
                    this.middleY, this.playerNo, this.color);
            displayList.addElement(shot);
            bulletList.addElement(shot);
            shootReleased = false;    
       } 
    }
};

/**
 * Rendering function of the space cannon's crossfire.
 * 
 */
SpaceCannon.prototype.renderState = function(){
//Debug     
context.fillStyle = "cyan";
context.fillText(sani_LeftPosX,20,20);
context.fillStyle = "pink";
context.fillText(sani_LeftPosY,760,20);
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

