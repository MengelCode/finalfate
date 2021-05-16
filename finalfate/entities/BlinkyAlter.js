/* 
 * BlinkyAlter.js
 * Blinky enemy object, tailored for Party Mode.
 */

class BlinkyAlter extends EnemyAlternate {
    /**
     * 
     * @param {type} posX
     * @param {type} posY
     * @param {type} width
     * @param {type} height
     * @returns {MeteorAlter}
     */
    constructor(posX,posY,width = 80, height = 80){
        super(posX,posY,width,height,meteorAlter_update, blinkyAlter_render);
    }    
}
/**
 * BlinkyAlter rendering function.
 * @returns {undefined}
 */

function blinkyAlter_render(){
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
    context.fillRect(this.posX,this.posY,this.width,this.height);
}

/**
 * The variable which is used to determine the chance that an off-screen
 * instance of this EnemyAlternate type will hit your space ship. 
 * @returns {Number}
 */
BlinkyAlter.prototype.getChance = function () {
    return 4;
};