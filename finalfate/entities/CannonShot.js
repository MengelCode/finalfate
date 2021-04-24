/**
 * CannonShot.js
 * The file for shots with the non-directly visible super light 
 * cannon shots for the Party Mode.
 */

class CannonShot extends GameObject {
    /*
     * Create a cannon shot which, if it does hit something, does destroy
     * obstacles / enemies.
     */
    constructor(beginX, beginY, endX, endY, color) {
        super();
        this.beginX = beginX;
        this.beginY = beginY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
    }
}

CannonShot.prototype.updateState = function(){
this.frameCounter++;
if(this.frameCounter === 4)this.invalidate();
};

/**
 * Rendering of the line of shot.
 * @returns {undefined}
 */
CannonShot.prototype.renderState = function(){
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = this.color;
    context.moveTo(this.beginX,this.beginY);
    context.lineTo(this.endX,this.endY);
    context.stroke();
};