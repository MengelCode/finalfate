/* 
 * BlinkyTracerAlter.js
 * Blinky Tracer enemy object, tailored for Party Mode.
 * Shoot them, or they will hit you no matter what.....
 */


class BlinkyTracerAlter extends EnemyAlternate {
     /**
     * 
     * @param {type} posX
     * @param {type} posY
     * @param {type} width
     * @param {type} height
     * @returns {MeteorAlter}
     */
    constructor(posX,posY,width = 80, height = 80){
        super(posX,posY,width,height,blinkyTracerAlter_update, blinkyAlter_render);
        //this.updateState = blinkyTracerAlter_update;
    } 
    
}

BlinkyTracerAlter.prototype.getChance = function () {
    return 1;
};

function blinkyTracerAlter_update(){
    meteorAlter_update.call(this);
    if(this.posX<400)this.posX+=5;
    else if(this.posX>410)this.posX-=5;
}